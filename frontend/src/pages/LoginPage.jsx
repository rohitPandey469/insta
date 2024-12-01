import React from 'react';

const LoginPage = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/login'; // Backend URL
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Instagram Manager</h1>
      <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Login with Instagram
      </button>
    </div>
  );
};

export default LoginPage;
