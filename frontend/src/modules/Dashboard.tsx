import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Halls from './halls/hall/Halls';

import Settings from './settings/Setting';
import Revenue from './revenue/Revenue';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
      if (window.innerWidth > 992) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="dashboard">
      {isMobile && (
        <>
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
          <div className={`overlay ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}></div>
        </>
      )}

      <aside className={`sidebar ${isMobile && isMenuOpen ? 'active' : ''}`}>
        <div className="logo-section">
          <div className="logo">
            <span>VP</span>
          </div>
          <h1>VenuePro</h1>
        </div>

        <div className="sidebar-header">
          <h2>Management</h2>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard/halls" onClick={() => setIsMenuOpen(false)}>
                <span className="icon">🏛️</span>
                <span className="text">Halls</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/revenue" onClick={() => setIsMenuOpen(false)}>
                <span className="icon">💰</span>
                <span className="text">Revenue</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/settings" onClick={() => setIsMenuOpen(false)}>
                <span className="icon">⚙️</span>
                <span className="text">Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">👤</div>
            <div className="user-info">
              <span className="name">Admin</span>
              <span className="role">Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="content">
        <Routes>

          <Route path="halls" element={<Halls />} />
          <Route path="settings" element={<Settings />} />
          <Route path="revenue" element={<Revenue />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
