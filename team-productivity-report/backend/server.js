const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const users = [];
const projectRoutes = require("./routes/projectRoutes");
app.use("/api/projects", projectRoutes);

const teamRoutes = require("./routes/teamRoutes");
app.use("/api/teams", teamRoutes);


// Add a user
app.post("/api/users", (req, res) => {
  const { id, name, email } = req.body;
  users.push({ id, name, email });
  console.log(`User Added !`)
  res.status(201).json({ message: "User added successfully", user: { id, name, email } });
});

// Get all users
app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
