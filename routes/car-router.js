const express = require("express");
const db = require("../data/dbConfig");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    db("cars")
      .select("*")
      .then((cars) => {
        res.status(200).json({ data: cars });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .json({ message: "Can't retrieve information from cars database" });
      });
  } catch {
    res.status(500).json({ errorMessage: err.message });
  }
});

router.get("/:id", validateCarId, (req, res) => {
  try {
    db("cars")
      .select("*")
      .where({ id: req.car })
      .then((car) => {
        res.status(200).json({ data: car });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json({
          message: "Can't retrieve information from cars database",
        });
      });
  } catch {
    res.status(500).json({ errorMessage: err.message });
  }
});

function validateCarId(req, res, next) {
  const carId = req.params.id;

  db("cars")
    .where({ id: carId })
    .then((car) => {
      req.car = car[0].id;
      next();
    })
    .catch((err) => {
      res.status(404).json({ message: "invalid user id" });
    });
}

module.exports = router;
