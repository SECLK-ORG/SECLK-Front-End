import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../templates/Layout';
import { Configurations, Projects, ProjectView, Employees, EmployeeView, Login,LoginRedirect,ResetPassWord,ForgetPassWord } from '../pages';

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
            <Layout>
              <Routes>
                <Route path="configurations" element={<Configurations />} />
                <Route path="projects" element={<Projects />} />
                <Route path="projects/:id" element={<ProjectView />} />
                <Route path="employees" element={<Employees />} />
                <Route path="employees/:id" element={<EmployeeView />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
