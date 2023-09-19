export const PUSH_TO_SNACKBAR = "PUSH_TO_SNACKBAR";
export const SET_USER = "SET_USER";
export const LOGOUT = "LOGOUT";
export const CLEAR_SNACKBAR = "CLEAR_SNACKBAR";

export const pushToSnackBar = (message, type = "error") => ({
  payload: { message, type, open: true },
  type: PUSH_TO_SNACKBAR,
});

export const setUser = (token, profile) => ({
  payload: { token, profile },
  type: SET_USER,
});

export const setUserProfile = (profile) => ({
  payload: { profile },
  type: SET_USER,
});

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("profile");
  return {
    type: LOGOUT,
  };
};
