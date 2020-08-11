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

router.post("/", validateCarInfo, (req, res) => {
  const carInfo = req.body;
  try {
    db("cars")
      .insert(carInfo)
      .then((newCar) => {
        db("cars")
          .select("*")
          .where({ id: newCar })
          .then((car) => {
            res.status(200).json({ data: car });
          })
          .catch((err) => {
            console.log(err);
            res.status(404).json({
              message: "Can't retrieve information from cars database",
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: "Unable to add car to database" });
      });
  } catch {
    res.status(500).json({ errorMessage: err.message });
  }
});

router.put("/:id", validateCarId, (req, res) => {
  const changes = req.body;

  try {
    db("cars")
      .where({ id: req.car })
      .update(changes)
      .then((count) => {
        if (count) {
          res.status(200).json({ message: "Updated car successfully" });
        }
      });
  } catch {
    console.log(err);
    res.status(500).json({ errorMessage: err.message });
  }
});

router.delete("/:id", validateCarId, (req, res) => {
  try {
    db("cars")
      .where({ id: req.car })
      .delete()
      .then((count) => {
        if (count) {
          res.status(200).json({ message: "Car deleted successfully" });
        }
      });
  } catch {
    console.log(err);
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

function validateCarInfo(req, res, next) {
  const carInfo = req.body;
  if (!carInfo) {
    res.status(400).json({ message: "Missing car data" });
  } else {
    const { VIN, make, model, mileage } = carInfo;
    if (!VIN || !make || !model || !mileage) {
      res
        .status(400)
        .json({ message: "Car data needs VIN, make, model and mileage" });
    } else {
      next();
    }
  }
}

module.exports = router;
