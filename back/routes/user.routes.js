const express = require("express");

const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controllers");

const routeur = express.Router();

routeur.get("/", getAllUsers);
routeur.get("/:id", getOneUser);
routeur.put("/:id", updateUser);
routeur.delete("/:id", deleteUser);

module.exports = routeur;
