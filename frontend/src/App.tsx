import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './modules/auth/Login';
import Dashboard from './modules/Dashboard';
import HallDetail from './modules/halls/HallDetail/HallDetail';
import HallCard from './modules/halls/HallCard/HallCard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/halls/:hallName" element={<HallDetail />} />

        <Route path="/" element={<div>Home Page or Hall List</div>} />
      </Routes>
    </Router>
  );
};

export default App;