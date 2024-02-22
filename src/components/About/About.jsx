import React from 'react';

const About = ({ onLogout }) => {
  const handleLogoutClick = () => {
    onLogout();
  };

  return (
    <div>
      <h2>About Page</h2>
      <p>This is the about page content.</p>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default About;
