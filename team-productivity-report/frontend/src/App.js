import React, { useState } from "react";
import axios from "axios";

function App() {
  const [view, setView] = useState("home");
  const [newProject, setNewProject] = useState({
    projectName: "",
    teamName: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [projects, setProjects] = useState([]);
  const [teamName, setTeamName] = useState("");

  const handleAddProject = async () => {
    try {
      const response = await axios.post("/api/projects/add-project", newProject);
      alert(response.data.message);
      setNewProject({
        projectName: "",
        teamName: "",
        description: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Error adding project.");
    }
  };

  const fetchProjects = async (team = "") => {
    try {
      const url = team ? `/api/projects/get-projects/${team}` : "/api/projects/get-projects";
      const response = await axios.get(url);
      setProjects(response.data.projects);
    } catch (error) {
      alert(error.response?.data?.message || "Error fetching projects.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Team Productivity Report</h1>
      <div style={{ margin: "10px 0" }}>
        <button onClick={() => setView("add-project")}>Add New Project</button>
        <button onClick={() => setView("view-projects")}>View Projects</button>
      </div>

      {view === "add-project" && (
        <div>
          <h2>Add New Project</h2>
          <input
            type="text"
            placeholder="Project Name"
            value={newProject.projectName}
            onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
            style={{ display: "block", margin: "10px 0" }}
          />
          <input
            type="text"
            placeholder="Team Name"
            value={newProject.teamName}
            onChange={(e) => setNewProject({ ...newProject, teamName: e.target.value })}
            style={{ display: "block", margin: "10px 0" }}
          />
          <textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            style={{ display: "block", margin: "10px 0", width: "300px", height: "100px" }}
          />
          <input
            type="date"
            placeholder="Start Date"
            value={newProject.startDate}
            onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
            style={{ display: "block", margin: "10px 0" }}
          />
          <input
            type="date"
            placeholder="End Date"
            value={newProject.endDate}
            onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
            style={{ display: "block", margin: "10px 0" }}
          />
          <button onClick={handleAddProject}>Submit</button>
        </div>
      )}

      {view === "view-projects" && (
        <div>
          <h2>View Projects</h2>
          <input
            type="text"
            placeholder="Enter Team Name (optional)"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            style={{ display: "block", margin: "10px 0" }}
          />
          <button onClick={() => fetchProjects(teamName)}>Fetch Projects</button>
          {projects.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h3>Project List:</h3>
              <ul>
                {projects.map((project, index) => (
                  <li key={index}>
                    <p><strong>Name:</strong> {project.projectName}</p>
                    <p><strong>Team:</strong> {project.teamName}</p>
                    <p><strong>Description:</strong> {project.description}</p>
                    <p><strong>Start Date:</strong> {project.startDate}</p>
                    <p><strong>End Date:</strong> {project.endDate}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
