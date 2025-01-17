const express = require("express");
const router = express.Router();

// In-memory database (replace with actual database in production)
let teams = [];

// Add a new team
router.post("/add-team", (req, res) => {
  const { name, currentProject, pastProjects } = req.body;

  if (!name || !currentProject) {
    return res.status(400).json({ message: "Name and current project are required." });
  }

  const newTeam = { name, currentProject, pastProjects: pastProjects || [] };
  teams.push(newTeam);

  res.status(201).json({ message: "Team added successfully!", team: newTeam });
});

// Get team information
router.get("/get-team/:name", (req, res) => {
  const { name } = req.params;
  const team = teams.find((t) => t.name.toLowerCase() === name.toLowerCase());

  if (!team) {
    return res.status(404).json({ message: "Team not found." });
  }

  res.status(200).json({ team });
});

module.exports = router;
