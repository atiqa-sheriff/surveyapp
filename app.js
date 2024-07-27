import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import SurveyList from "./components/SurveyList";
import CreateSurvey from "./components/CreateSurvey";
import SurveyDetails from "./components/SurveyDetails";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/surveys">Surveys</Link>
            </li>
            <li>
              <Link to="/create-survey">Create Survey</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/surveys" element={<SurveyList />} />
          <Route path="/create-survey" element={<CreateSurvey />} />
          <Route path="/surveys/:id" element={<SurveyDetails />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
