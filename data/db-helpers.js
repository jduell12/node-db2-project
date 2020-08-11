const db = require("../data/dbConfig");

module.exports = {
  get,
  getByID,
  insertCar,
  update,
  remove,
};

//returns array of cars
function get() {
  return db("cars");
}

//returns a single user or null if no user
function getByID(id) {
  return db("cars").select("*").where({ id: id }).first();
}

function insertCar(carInfo) {
  return db("cars")
    .insert(carInfo)
    .then((cars) => {
      return getByID(cars[0]);
    });
}

function update(id, changes) {
  return db("cars").where({ id: id }).update(changes);
}

function remove(id) {
  return db("cars").where({ id: id }).delete();
}
