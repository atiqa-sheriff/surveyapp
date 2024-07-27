import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5005/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => console.error("Error fetching user:", error));

    fetch("http://localhost:5005/api/surveys", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSurveys(data);
      })
      .catch((error) => console.error("Error fetching surveys:", error));
  }, []);

  const deleteSurvey = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5005/api/surveys/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSurveys(surveys.filter((survey) => survey._id !== id));
      } else {
        console.error("Failed to delete survey");
      }
    } catch (error) {
      console.error("Error deleting survey:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <h2>Your Surveys</h2>
      <ul>
        {surveys.map((survey) => (
          <li key={survey._id}>
            <Link to={`/surveys/${survey._id}`}>{survey.title}</Link>
            <button onClick={() => deleteSurvey(survey._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/create-survey">
        <button>Create New Survey</button>
      </Link>
    </div>
  );
}

export default UserProfile;
