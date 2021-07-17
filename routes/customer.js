const express = require("express");
const router = express.Router();

// Import validators
const {
  createOrUpdateCustomerValidator,
} = require("../middlewares/validators/customer");

// Import controllers
const {
  createCustomer,
  getCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer");

// It will find route that has / first after that it will find is it GET or POST
router
  .route("/")
  .get(getCustomer)
  .post(createOrUpdateCustomerValidator, createCustomer);

// It will find route that has /:id first after that it will find is it GET or PUT or DELETE
router
  .route("/:id")
  .get(getCustomerById)
  .put(createOrUpdateCustomerValidator, updateCustomer)
  .delete(deleteCustomer);

module.exports = router;
