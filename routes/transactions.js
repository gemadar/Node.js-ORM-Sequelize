const express = require("express");

// Import validators
const {
  createTransactionValidator,
} = require("../middlewares/validators/transactions");

// Import controllers
const { createTransaction } = require("../controllers/transactions");
const router = express.Router();

router.post("/", createTransactionValidator, createTransaction);

module.exports = router;
