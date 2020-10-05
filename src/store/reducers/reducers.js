import TYPES from "../actions/types";
import _ from "lodash";

export const LOADER = (state = [], action) => {
  if (action.type === TYPES.LOADING) {
    let alreadyExist = state.find((item) => item.id === action.payload.id);

    if (alreadyExist)
      return [
        ...state.filter((item) => item.id !== action.payload.id),
        action.payload,
      ];
    else return [...state, action.payload];
  }

  return state;
};

export const TOKEN = (
  state = localStorage.getItem("fmt-user-token"),
  action
) => {
  if (action.type === TYPES.SET_TOKEN) return action.payload;
  if (action.type === TYPES.LOGOUT) return null;
  return state;
};

export const AUTHORIZED = (state = false, action) => {
  if (action.type === TYPES.LOGIN) return true;
  if (action.type === TYPES.LOGOUT) return false;

  return state;
};

export const USER_PROFILE = (state = {}, action) => {
  if (action.type === TYPES.LOGIN) return action.payload;
  if (action.type === TYPES.UPDATE_PROFILE)
    return _.merge(state, action.payload);
  if (action.type === TYPES.LOGOUT) return {};

  return state;
};

export const ERROR = (state = { show: false }, action) => {
  if (action.type === TYPES.ERROR && action.payload.response)
    state = {
      ...action.payload.response.data,
      show: true,
    };
  else if (action.type === TYPES.ERROR && !action.payload.response) {
    let payload = {
      code: "DEFAULT_ERROR",
      message: action.payload,
    };
    state = {
      ...payload,
      show: true,
    };
  } else if (action.type === TYPES.HIDE_ERROR)
    state = {
      ...state,
      show: false,
    };

  return state;
};