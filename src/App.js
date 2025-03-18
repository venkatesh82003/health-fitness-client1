//import logo from './logo.svg';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import LogWorkout from './pages/LogWorkout';
import TrackCalories from './pages/TrackCalories';
import ViewFitnessTrends from './pages/ViewFitnessTrends';
import SigninSignup from './pages/SigninAndSignup';
import React, { useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import { FaSignOutAlt } from 'react-icons/fa';

function App() {
  const [isUserAuthenticated, setUserAuthenticated] = useState(false);

  const login = () => {
    setUserAuthenticated(true);
  };

  const logout = () => {
    setUserAuthenticated(false);
  };

  return (
    <div className="App1">
      <BrowserRouter>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <div className="container-fluid">
            <Link className="navbar-brand fw-bold text-uppercase" to="#">
              Health & Fitness
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ms-auto">
                {isUserAuthenticated && (
                  <>
                    <Link className="nav-link text-light fw-bold" to="/Dashboard">Dashboard</Link>
                    <Link className="nav-link text-light fw-bold" to="/LogWorkout">Log Workout</Link>
                    <Link className="nav-link text-light fw-bold" to="/TrackCalories">Track Calories</Link>
                    <Link className="nav-link text-light fw-bold" to="/ViewFitnessTrends">View Fitness Trends</Link>

                    <button className="btn btn-danger ms-3 d-flex align-items-center" onClick={logout}>
                      <FaSignOutAlt className="me-2" /> Logout 
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route element={<ProtectedRoute isUserAuthenticated={isUserAuthenticated} />}>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/LogWorkout" element={<LogWorkout />} />
            <Route path="/TrackCalories" element={<TrackCalories />} />
            <Route path="/ViewFitnessTrends" element={<ViewFitnessTrends />} />
          </Route>
          <Route path="/" element={<SigninSignup login={login} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
