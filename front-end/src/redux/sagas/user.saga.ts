import { call, put, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { UserService } from '../../services/user.service'; 
import { loginRequest, loginSuccess, loginError } from '../userSlice/userSlice';

function* unilogin(action: ReturnType<typeof loginRequest>) {
  try {
    const response: AxiosResponse<any> = yield call(UserService.login, action.payload);
    yield put(loginSuccess(response.data));
  } catch (error) {
    yield put(loginError(error));
  }
}

function* userSaga() {
  yield takeEvery(loginRequest, unilogin);
}

export default userSaga;
