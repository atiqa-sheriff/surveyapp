const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Connect to the database
connectDB();

// Initialize middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/surveys", require("./routes/surveyRoutes"));

// Serve static assets in production
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
