const express = require("express");
const router = express.Router();

// In-memory database for projects (replace with a real database in production)
let projects = [];

// Add a new project
router.post("/add-project", (req, res) => {
  const { projectName, teamName, description, startDate, endDate } = req.body;

  if (!projectName || !teamName) {
    return res.status(400).json({ message: "Project name and team name are required." });
  }

  const newProject = {
    projectName,
    teamName,
    description: description || "No description provided",
    startDate: startDate || "Not specified",
    endDate: endDate || "Ongoing",
  };

  projects.push(newProject);
  res.status(201).json({ message: "Project added successfully!", project: newProject });
});

// Retrieve all projects
router.get("/get-projects", (req, res) => {
  res.status(200).json({ projects });
});

// Retrieve projects for a specific team
router.get("/get-projects/:teamName", (req, res) => {
  const { teamName } = req.params;
  const teamProjects = projects.filter(
    (project) => project.teamName.toLowerCase() === teamName.toLowerCase()
  );

  if (teamProjects.length === 0) {
    return res.status(404).json({ message: "No projects found for this team." });
  }

  res.status(200).json({ projects: teamProjects });
});

module.exports = router;
