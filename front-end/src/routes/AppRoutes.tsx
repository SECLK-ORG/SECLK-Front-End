import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../templates/Layout';
import { Configurations,Projects } from '../pages';
// import Dashboard from '../pages/Dashboard/Dashboard';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/configurations" element={<Configurations />} />
          <Route path="/projects" element={<Projects />} />
  
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
