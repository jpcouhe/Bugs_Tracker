const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
const ticketRoutes = require("./routes/ticket.routes");
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());
server.use(cookieParser());

server.use((req, res, next) => {
  res.setHeader("Acces-Controll-Allow-Origin", "*");
  res.setHeader(
    "Acces-Controll-Allow-Headers",
    "Origin,X-Requested-With,Content,Accept,Content-Type,Authorization"
  );
  res.setHeader("Acces-Controll-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});

server.use("/api/user", userRoutes);
server.use("/api/auth", authRoutes);
server.use("/api/project", projectRoutes);
server.use("/api/ticket", ticketRoutes);

server.use((err, req, res, next) => {
  res.status(500).json({ error: error.message });
});

server.listen(process.env.SERVER_PORT);

module.exports = server;
