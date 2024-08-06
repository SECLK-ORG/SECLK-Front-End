import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust the path as necessary
import { APP_ACTION_STATUS } from '../utilities/constants/app.constants';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const loginState = useSelector((state: RootState) => state.user.login);

  if (loginState.status !== APP_ACTION_STATUS.SUCCESS) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
