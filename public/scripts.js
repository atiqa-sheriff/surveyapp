document.addEventListener("DOMContentLoaded", () => {
  const authContainer = document.getElementById("auth-container");
  const mainContainer = document.getElementById("main-container");

  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const surveyForm = document.getElementById("survey-form");
  const addQuestionButton = document.getElementById("add-question");
  const logoutButton = document.getElementById("logout-button");
  const surveyList = document.getElementById("survey-list");

  let authToken = "";

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Attempting to log in");

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        authToken = data.token;
        localStorage.setItem("authToken", authToken);

        authContainer.style.display = "none";
        mainContainer.style.display = "block";

        clearSurveys();
        loadSurveys();
      } else {
        console.error("Login failed:", response.statusText);
        alert("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  });

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Attempting to sign up");

    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        authToken = data.token;
        localStorage.setItem("authToken", authToken);

        authContainer.style.display = "none";
        mainContainer.style.display = "block";

        clearSurveys();
        loadSurveys();
      } else {
        const errorData = await response.json();
        console.error("Sign up failed:", response.statusText, errorData);
        alert("Sign up failed. Please try again.");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert("An error occurred during sign up. Please try again.");
    }
  });

  surveyForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Attempting to create survey");

    const title = document.getElementById("survey-title").value;
    const description = document.getElementById("survey-description").value;
    const questions = [];

    document.querySelectorAll(".question-item").forEach((questionItem) => {
      const questionText = questionItem.querySelector(".question-text").value;
      const options = [];

      questionItem.querySelectorAll(".option-text").forEach((optionInput) => {
        options.push({ text: optionInput.value }); // Format each option as an object
      });

      questions.push({ text: questionText, options, required: true });
    });

    const surveyData = { title, description, questions };
    console.log("Survey data to be sent:", surveyData);

    try {
      const response = await fetch("/api/surveys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": authToken,
        },
        body: JSON.stringify(surveyData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Survey created successfully:", data);
        window.location.href = `survey.html?id=${data._id}`;
      } else {
        const errorData = await response.json();
        console.error(
          "Failed to create survey:",
          response.statusText,
          errorData
        );
        alert("Failed to create survey. Please try again.");
      }
    } catch (error) {
      console.error("Error creating survey:", error);
      alert("Failed to create survey. Please try again.");
    }
  });

  addQuestionButton.addEventListener("click", () => {
    const questionCount = document.querySelectorAll(".question-item").length;
    const questionItem = document.createElement("div");
    questionItem.className = "question-item";
    questionItem.innerHTML = `
        <input type="text" class="question-text" placeholder="Question ${
          questionCount + 1
        }" required />
        <div class="options-container">
          <div class="option-container">
            <input type="text" class="option-text" placeholder="Option 1" required />
            <button type="button" class="delete-option">Delete Option</button>
          </div>
          <div class="option-container">
            <input type="text" class="option-text" placeholder="Option 2" required />
            <button type="button" class="delete-option">Delete Option</button>
          </div>
        </div>
        <button type="button" class="add-option">Add Option</button>
        <button type="button" class="delete-question">Delete Question</button>
      `;
    document.getElementById("questions-container").appendChild(questionItem);

    questionItem.querySelector(".add-option").addEventListener("click", (e) => {
      const optionsContainer = e.target.previousElementSibling;
      const optionCount =
        optionsContainer.querySelectorAll(".option-container").length;
      const optionContainer = document.createElement("div");
      optionContainer.className = "option-container";
      optionContainer.innerHTML = `
          <input type="text" class="option-text" placeholder="Option ${
            optionCount + 1
          }" required />
          <button type="button" class="delete-option">Delete Option</button>
        `;
      optionsContainer.appendChild(optionContainer);

      optionContainer
        .querySelector(".delete-option")
        .addEventListener("click", (e) => {
          optionContainer.remove();
        });
    });

    questionItem
      .querySelector(".delete-question")
      .addEventListener("click", (e) => {
        questionItem.remove();
      });

    questionItem.querySelectorAll(".delete-option").forEach((button) => {
      button.addEventListener("click", (e) => {
        button.parentElement.remove();
      });
    });
  });

  logoutButton.addEventListener("click", () => {
    authToken = "";
    localStorage.removeItem("authToken");
    clearSurveys();
    authContainer.style.display = "block";
    mainContainer.style.display = "none";
  });

  function clearSurveys() {
    console.log("Clearing survey list");
    surveyList.innerHTML = "";
  }

  function displaySurvey(survey) {
    const surveyItem = document.createElement("div");
    surveyItem.innerHTML = `
        <h2>${survey.title}</h2>
        <p>${survey.description}</p>
        <ul>
          ${survey.questions
            .map((question) => `<li>${question.text}</li>`)
            .join("")}
        </ul>
      `;
    surveyList.appendChild(surveyItem);
  }

  async function loadSurveys() {
    try {
      const response = await fetch("/api/surveys", {
        headers: {
          "x-auth-token": authToken,
        },
      });
      const surveys = await response.json();

      clearSurveys();
      surveys.forEach((survey) => {
        displaySurvey(survey);
      });
    } catch (error) {
      console.error("Error fetching surveys:", error);
    }
  }
});
