import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStateDto } from '../../utilities/models';
import { APP_ACTION_STATUS, COMMON_ACTION_TYPES, USER_ACTION_TYPES } from '../../utilities/constants/app.constants';

const INITIAL_STATE: UserStateDto = {
    login: {
      data: {},
      error: null,
      isLoading: false,
      status: APP_ACTION_STATUS.INITIAL,
    },
  };

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    loginRequest(state, action: PayloadAction<any>) {
      state.login.isLoading = true;
      state.login.status = APP_ACTION_STATUS.LOADING;
      state.login.error = null;
      state.login.data = null;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.login.isLoading = false;
      state.login.status = APP_ACTION_STATUS.SUCCESS;
      state.login.error = null;
      state.login.data = action.payload;
    },
    loginError(state, action: PayloadAction<any>) {
      state.login.isLoading = false;
      state.login.status = APP_ACTION_STATUS.ERROR;
      state.login.error = action.payload;
      state.login.data = null;
    },
    loginClear(state) {
      state.login.isLoading = false;
      state.login.status = APP_ACTION_STATUS.INITIAL;
      state.login.error = null;
      state.login.data = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginError, loginClear } = userSlice.actions;
export default userSlice.reducer;
