// src/utils/authUtils.tsx
import { loginClear } from '../redux/userSlice/userSlice';
import store from '../redux/store/index'
export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.clear();
    store.dispatch(loginClear());
    window.location.href = '/';
  };