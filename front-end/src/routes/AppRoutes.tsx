import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../templates/Layout';
import { Configurations,Projects,ProjectView } from '../pages';
// import Dashboard from '../pages/Dashboard/Dashboard';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/configurations" element={<Configurations />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectView/>} />
  
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
