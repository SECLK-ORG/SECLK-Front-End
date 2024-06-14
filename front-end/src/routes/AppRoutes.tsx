import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../templates/Layout';
import Dashboard from '../pages/Dashboard/Dashboard';
const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
  
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
