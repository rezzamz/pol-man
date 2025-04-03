import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Halls from './halls/Halls';
import HallDetail from './halls/HallDetail';
import Settings from './settings/Setting';
import Revenue from './revenue/Revenue';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <nav>
          <ul>
            <li><Link to="/dashboard/halls">Halls</Link></li>
            <li><Link to="/dashboard/settings">Settings</Link></li>
            <li><Link to="/dashboard/revenue">Revenue</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <Routes>
          <Route path="halls/:hallId" element={<HallDetail />} />
          <Route path="halls" element={<Halls />} />
          <Route path="settings" element={<Settings />} />
          <Route path="revenue" element={<Revenue />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;