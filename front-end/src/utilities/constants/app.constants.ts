export const USER_ROLES = {
    ADMIN: 1,
    USER: 2,
  };

export const SCREEN_MODES = {
    CREATE: "CREATE",
    EDIT: "EDIT",
    VIEW: "VIEW",
    DELETE: "DELETE",
  };

  export const COMMON_ACTION_TYPES = {
    REQUEST: "_REQUEST",
    SUCCESS: "_SUCCESS",
    ERROR: "_ERROR",
    CLEAR: "_CLEAR",
  };
  export const APP_ACTION_STATUS = {
    INITIAL: 'initial',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
  } as const;

  export const USER_ACTION_TYPES = {
    USER_LOGIN: "USER_LOGIN",
  };
  
  export  interface PROJECT_STATUSType{
    _id:number;
    name:string;
  }
  export const PROJECT_STATUS:PROJECT_STATUSType[] = [{_id:1, name:'Completed'},{_id:2, name:'On-Hold'},{_id:3, name:'In-Progress'}]
  export type AppActionStatus = typeof APP_ACTION_STATUS[keyof typeof APP_ACTION_STATUS];