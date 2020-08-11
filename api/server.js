const express = require("express");
const CarRouter = require("../routes/car-router");

const server = express();

server.use(express.json());
server.use("/api/cars", CarRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "Working" });
});

module.exports = server;
