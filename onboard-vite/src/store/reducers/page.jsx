import * as actions from "../actions";

const initialState = {
  docId: null,
  active: null,
  ordering: [],
  blocks: {},
  isEdited: false,
};

export const pageReducer = (state = initialState, { type, payload }) => {
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

    case actions.ON_BLUR: {
      return {
        ...state,
        blocks: { ...state.blocks, [payload._id]: payload },
        isEdited: true,
      };
    }

    case actions.ADD_BLOCK: {
      const { _id: prev, ...rest } = payload;
      const _id = new Date().getTime();
      const ordering = [...state.ordering];
      const index = (prev && ordering.indexOf(prev) + 1) || ordering.length;
      ordering.splice(index, 0, _id);
      return {
        ...state,
        blocks: { ...state.blocks, [_id]: rest },
        active: _id,
        ordering,
        isEdited: true,
      };
    }

    case actions.REMOVE_BLOCK: {
      const { _id } = payload;
      if (state.ordering.length === 1) return state;
      const { [_id]: _, ...blocks } = state.blocks;
      const index = state.ordering.indexOf(_id);
      const ordering = state.ordering.filter((x) => x !== _id);
      return {
        ...state,
        blocks,
        ordering,
        active: ordering[index - 1],
        isEdited: true,
      };
    }

    case actions.LOSE_FOCUS: {
      return { ...state, active: null };
    }

    case actions.CHANGE_TYPE: {
      const { _id, newType } = payload;
      const { [_id]: block, ...blocks } = state.blocks;
      return {
        ...state,
        blocks: { ...blocks, [_id]: { ...block, type: newType } },
        active: _id,
        isEdited: true,
      };
    }

    case actions.SET_BLOCKS: {
      const { blocks, ordering, docId } = payload;
      return {
        ...state,
        docId,
        blocks,
        ordering,
        active: null,
        isEdited: false,
      };
    }

    default:
      return state;
  }
};
