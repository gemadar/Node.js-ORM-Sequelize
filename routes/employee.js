const express = require("express");

// Import validators
const {
  createEmployeeValidator,
  updateEmployeeValidator,
} = require("../middlewares/validators/employee");

// Import controllers
const {
  createEmployee,
  readAllEmployees,
  readEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee");

const router = express.Router();

// It will find route that has / first after that it will find is it GET or POST
router
  .route("/")
  .get(readAllEmployees)
  .post(createEmployeeValidator, createEmployee);

// It will find route that has /:id first after that it will find is it GET or PUT or DELETE
router
  .route("/:id")
  .get(readEmployeeById)
  .put(updateEmployeeValidator, updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
