const express = require("express");

const {
  getAllProjects,
  updateProject,
  createProject,
  deleteProject,
} = require("../controllers/project.controller");

const routeur = express.Router();

routeur.post("/", createProject);
routeur.get("/", getAllProjects);
routeur.put("/:id", updateProject);
routeur.delete("/:i", deleteProject);

module.exports = routeur;
