import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';

// Import components
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">OctoFit Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/users">Users</Nav.Link>
                <Nav.Link as={Link} to="/teams">Teams</Nav.Link>
                <Nav.Link as={Link} to="/activities">Activities</Nav.Link>
                <Nav.Link as={Link} to="/workouts">Workouts</Nav.Link>
                <Nav.Link as={Link} to="/leaderboard">Leaderboard</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={
            <div className="welcome-container">
              <h1 className="welcome-title display-4">Welcome to OctoFit Tracker</h1>
              <p className="welcome-subtitle lead">Mergington High School's fitness tracking application</p>
              <div className="card mt-5 mx-auto" style={{ maxWidth: '600px' }}>
                <div className="card-header">Get Started</div>
                <div className="card-body">
                  <p className="card-text">Use the navigation bar to explore the app</p>
                  <div className="d-flex justify-content-center gap-3 mt-4">
                    <Link to="/activities" className="btn btn-primary">View Activities</Link>
                    <Link to="/leaderboard" className="btn btn-outline-primary">Check Leaderboard</Link>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
