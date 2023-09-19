export const actions = {
  ADD_BLOCK: "ADD_BLOCK",
  SET_BLOCKS: "SET_BLOCKS",
  REMOVE_BLOCK: "REMOVE_BLOCK",
  SET_ACTIVE: "SET_ACTIVE",
  CHANGE_TYPE: "CHANGE_TYPE",
  SET_SAVED: "SET_SAVED",
  LOSE_FOCUS: "LOSE_FOCUS",
};

export const remove = (_id) => ({
  type: actions.REMOVE_BLOCK,
  payload: { _id },
});
export const add = (_id, type = "p") => ({
  type: actions.ADD_BLOCK,
  payload: { _id, type },
});
export const setActive = (_id, move) => ({
  type: actions.SET_ACTIVE,
  payload: { _id, move },
});

export const loseFocus = () => ({
  type: actions.LOSE_FOCUS,
});

export const changeType = (_id, newType) => ({
  type: actions.CHANGE_TYPE,
  payload: { _id, newType },
});

export const saveBlock = (_id, block) => ({
  type: actions.SET_SAVED,
  payload: { block, _id },
});

const initialState = {
  active: null,
  ordering: [],
  blocks: {},
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SET_ACTIVE: {
      let { _id, move } = payload;
      const index = state.ordering.indexOf(_id);
      if (state.blocks?.[state.ordering[index + move]]?.type === "divider") {
        move *= 2;
      }
      return {
        ...state,
        active: state.ordering?.[index + move] || state.active,
      };
    }

    case actions.ADD_BLOCK: {
      const { _id: prev, ...rest } = payload;
      const _id = new Date().getTime();
      const ordering = [...state.ordering];
      const index = (prev && ordering.indexOf(prev)) || ordering.length - 1;
      ordering.splice(index + 1, 0, _id);
      return {
        ...state,
        blocks: { ...state.blocks, [_id]: rest },
        active: _id,
        ordering,
      };
    }

    case actions.REMOVE_BLOCK: {
      const { _id } = payload;
      if (state.ordering.length === 1) return state;
      const { [_id]: _, ...blocks } = state.blocks;
      const index = state.ordering.indexOf(_id);
      const ordering = state.ordering.filter((x) => x !== _id);
      return { ...state, blocks, ordering, active: ordering[index - 1] };
    }

    case actions.LOSE_FOCUS: {
      return { ...state, active: null };
    }

    case actions.SET_SAVED: {
      const { _id, block } = payload;
      const { [_id]: _, ...rest } = state.blocks;
      if (state.ordering.includes(block?._id))
        return { ...state, blocks: { ...rest, [_id]: block } };
      else {
        const ordering = [...state.ordering];
        const index = ordering.indexOf(_id);
        ordering.splice(index, 1, block?._id);
        return {
          ...state,
          blocks: { ...rest, [block?._id]: block },
          ordering,
          active: _id === state.active ? block?._id : state.active,
        };
      }
    }

    case actions.CHANGE_TYPE: {
      const { _id, newType } = payload;
      const { [_id]: block, ...blocks } = state.blocks;
      return {
        ...state,
        blocks: { ...blocks, [_id]: { ...block, type: newType } },
        active: _id,
      };
    }

    case actions.SET_BLOCKS: {
      const { blocks, ordering } = payload;
      return {
        ...state,
        blocks,
        ordering,
        active: null,
      };
    }

    default:
      return state;
  }
};
