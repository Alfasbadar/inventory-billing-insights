import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import LoginSignup from './components/LoginSignup/LoginSignup';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import Navbar from './components/NavBar/NavBar';
import { getAuth, onAuthStateChanged, signOut } from './config/firebase';

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  if (initializing) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/LoginSignup" element={<LoginSignup />} />
        <Route path="/home/*" element={user ? <Home /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
