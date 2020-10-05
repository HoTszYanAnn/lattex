import TYPES from "./types";

export const loading = (status, id) => {
  return {
    type: TYPES.LOADING,
    payload: {
      id: id || undefined,
      status,
    },
  };
};

export const setToken = (token) => {
  return { type: TYPES.SET_TOKEN, payload: token };
};

export const login = (me) => {
  return {
    type: TYPES.LOGIN,
    payload: me,
  };
};

export const logout = () => {
  return {
    type: TYPES.LOGOUT,
  };
};