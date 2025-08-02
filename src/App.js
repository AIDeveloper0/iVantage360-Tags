import React, { useState } from 'react';
import './App.css';
import TemplatesPage from './TemplatesPage';
import StoreTagsPage from './StoreTagsPage';
import FabricCanvasPage from './FabricCanvasPage';

const NetworkImage = () => {
  return (
    <img 
      src="/network-graph.png" 
      alt="Network Graph" 
      className="network-graphic"
      style={{
        width: '200px',
        height: '200px',
        objectFit: 'contain'
      }}
    />
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('templates');
  const [formData, setFormData] = useState({
    companyCode: 'afhstX',
    username: 'a51nha',
    password: '••••••••'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Simulate successful login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('templates');
  };

  const handlePageChange = (page) => {
    console.log('Page change requested:', page);
    setCurrentPage(page);
  };

  // If logged in, show appropriate page
  if (isLoggedIn) {
    console.log('Current page:', currentPage);
    if (currentPage === 'store-tags') {
      return <StoreTagsPage onLogout={handleLogout} onPageChange={handlePageChange} />;
    } else if (currentPage === 'fabric-canvas') {
      return <FabricCanvasPage onLogout={handleLogout} onPageChange={handlePageChange} />;
    } else {
      return <TemplatesPage onLogout={handleLogout} onPageChange={handlePageChange} />;
    }
  }

  return (
    <div className="app">
      {/* Starry Night Background */}
      <div className="background">
        <div className="stars"></div>
        <div className="tree"></div>
      </div>

      {/* Login Modal */}
      <div className="login-modal">
        {/* Header */}
        <div className="modal-header">
          <div className="header-left">
            <div className="logo-icon">
              <img 
                src="/network-graph.png" 
                alt="Network Graph" 
                style={{
                  width: '24px',
                  height: '24px',
                  filter: 'brightness(0) invert(1)'
                }}
              />
            </div>
            <span className="app-title">iVantage360 Tags - Login</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="login-content">
            {/* Left Side Graphic */}
            <div className="left-graphic">
              <NetworkImage />
            </div>

            {/* Right Side Form */}
            <div className="login-form">
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="companyCode">Company Code</label>
                  <input
                    type="text"
                    id="companyCode"
                    name="companyCode"
                    value={formData.companyCode}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="focused"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="button-group">
                  <button type="submit" className="login-btn">
                    Login
                  </button>
                  <button type="button" className="forgot-btn">
                    Forgot Password?
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
