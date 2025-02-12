import _ from "lodash";

export const STEMS = {
  HOME: "/",

  EDITOR: "/editor",

  NOT_FOUND: "/404",
};


export const APP_ROUTES = {
  HOME: `${STEMS.HOME}`,

  EDITOR: (id) => `${STEMS.EDITOR}/${id}`,
  EDITORS: `${STEMS.EDITOR}`,

  NOT_FOUND: `${STEMS.NOT_FOUND}`,
};

export const APP_PATHS = {
  HOME: `${STEMS.HOME}`,
  LOGIN: `${STEMS.LOGIN}`,
  
  EDITOR: `${STEMS.EDITOR}/:id`,
  EDITORS: `${STEMS.EDITOR}`,

  NOT_FOUND: `${STEMS.NOT_FOUND}`,
};
