import * as actions from "../actions";

const initialState = {
  snackbar: {
    open: false,
    message: "",
    type: "",
  },
  token: null,
  profile: null,
};

export const commonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.PUSH_TO_SNACKBAR:
      return { ...state, snackbar: payload };
    case actions.CLEAR_SNACKBAR:
      return { ...state, snackbar: { ...state.snackbar, open: false } };
    case actions.LOGOUT:
      return { ...state, token: null, profile: null };
    case actions.SET_USER:
      return { ...state, ...payload };
    default:
      return state;
  }
};
