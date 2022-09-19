const express = require("express");

const {
  createUser,
  loginUser,
  getCurrentUser,
  logout,
} = require("../controllers/auth.controllers");

const routeur = express.Router();

routeur.post("/signup", createUser);
routeur.post("/login", loginUser);
routeur.get("/currentuser", getCurrentUser);
routeur.delete("/logout", logout);
module.exports = routeur;
