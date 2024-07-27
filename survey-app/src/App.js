import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import SurveyList from "./components/SurveyList";
import CreateSurvey from "./components/CreateSurvey";
import SurveyDetails from "./components/SurveyDetails";
import UserProfile from "./components/UserProfile";
import SurveyCompleted from "./components/SurveyCompleted";
import Login from "./components/Login";
import Signup from "./components/Signup";
import logo from "./team_logo.png"; // Ensure the path is correct
import "./App.css"; // Import the CSS file

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return <button onClick={handleLogout}>Sign Out</button>;
};

const App = () => {
  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  return (
    <Router>
      <div>
        <header>
          <div className="logo-container">
            <img src={logo} alt="Team Logo" className="logo" />{" "}
            <span className="title">SurveySphere</span>
          </div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/create-survey">Create Survey</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                {isAuthenticated() ? (
                  <LogoutButton />
                ) : (
                  <Link to="/signup">Sign Up</Link>
                )}
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/surveys"
            element={isAuthenticated() ? <SurveyList /> : <Signup />}
          />
          <Route
            path="/create-survey"
            element={isAuthenticated() ? <CreateSurvey /> : <Signup />}
          />
          <Route path="/surveys/:id" element={<SurveyDetails />} />
          <Route
            path="/profile"
            element={isAuthenticated() ? <UserProfile /> : <Signup />}
          />
          <Route path="/survey-completed" element={<SurveyCompleted />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
