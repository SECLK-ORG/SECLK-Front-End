import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../templates/Layout';
import { Configurations, Projects, ProjectView, Employees, EmployeeView, Login,LoginRedirect,ResetPassWord,ForgetPassWord } from '../pages';
import PrivateRouteProps from './PrivateRouteProps';

const AppRoutes: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/:token" element={<LoginRedirect />} />
        <Route path="/reset" element={<ResetPassWord />} />
        <Route path="/forgotPass" element={<ForgetPassWord />} />
        <Route 
          path="/*" 
          element={
            <PrivateRouteProps>
            <Layout>
              <Routes>
                <Route path="configurations" element={<Configurations />} />
                <Route path="projects" element={<Projects />} />
                <Route path="projects/:projectId" element={<ProjectView />} />
                <Route path="employees" element={<Employees />} />
                <Route path="employees/:id" element={<EmployeeView />} />
              </Routes>
            </Layout>
            </PrivateRouteProps>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
