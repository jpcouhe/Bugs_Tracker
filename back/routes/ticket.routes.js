const express = require("express");

const {
  getAllTickets,
  getOneTicket,
  updateTicket,
  createTicket,
  getAllTicketsById,
  deleteTicket,
  postComment,
  getComment,
  deleteComment,
} = require("../controllers/ticket.controllers");

const routeur = express.Router();

routeur.post("/", createTicket);
routeur.post("/comment/:id", postComment);
routeur.get("/", getAllTickets);
routeur.get("/comment/:id", getComment);
routeur.get("/project/:project/", getAllTicketsById);
routeur.get("/:id", getOneTicket);
routeur.put("/:id", updateTicket);
routeur.delete("/:id", deleteTicket);
routeur.delete("/comment/:id", deleteComment);

module.exports = routeur;
