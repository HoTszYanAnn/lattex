import _ from "lodash";

export const STEMS = {
  HOME: "/",

  EDITOR: "/editor",
  PROJECT_LIST: "project",

  NOT_FOUND: "/404",
};


export const APP_ROUTES = {
  HOME: `${STEMS.HOME}`,

  EDITOR: `${STEMS.EDITOR}`,
  PROJECT_LIST: `${STEMS.PROJECT_LIST}`,

  NOT_FOUND: `${STEMS.NOT_FOUND}`,
};

export const APP_PATHS = {
  HOME: `${STEMS.HOME}`,
  LOGIN: `${STEMS.LOGIN}`,
  
  EDITOR: `${STEMS.EDITOR}`,
  PROJECT_LIST: `${STEMS.PROJECT_LIST}`,

  NOT_FOUND: `${STEMS.NOT_FOUND}`,
};
