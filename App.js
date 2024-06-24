import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import MainPage from './Components/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
   
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignUp = ({ username, password }) => {
    const existingUser = localStorage.getItem(username);
    if (existingUser) {
      alert('Username already exists. Please choose a different one.');
      return;
    }

    localStorage.setItem(username, JSON.stringify({ username, password }));
    localStorage.setItem('isLoggedIn', 'true'); 
    setIsLoggedIn(true);
  };

  const handleSignIn = ({ username, password }) => {
    const storedUser = localStorage.getItem(username);
    if (!storedUser) {
      alert('Invalid username or password');
      return;
    }

    const { password: storedPassword } = JSON.parse(storedUser);
    if (password === storedPassword) {
      localStorage.setItem('isLoggedIn', 'true'); 
      setIsLoggedIn(true);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn'); 
    setIsLoggedIn(false);
  };

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  useEffect(() => {
   
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <Router>
     
      <Routes>
        <Route
          path="/main"
          element={isLoggedIn ? <MainPage handleSignOut={handleSignOut} /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/main" />
            ) : (
              isSignUp ? (
                <SignUp handleSignUp={handleSignUp} toggleForm={toggleForm} />
              ) : (
                <SignIn handleSignIn={handleSignIn} toggleForm={toggleForm} />
              )
            )
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;
