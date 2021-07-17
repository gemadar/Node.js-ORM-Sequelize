const express = require("express");

// Import validator
const { createGoodValidator, updateGoodValidator } = require("../middlewares/validators/goods");

// Import controller
const { createGood, getAllGoods, getOneGood, updateGood, deleteGood } = require("../controllers/goods");
const { updateTransaction } = require("../controllers/transactions");

const router = express.Router();

router.post("/", createGoodValidator, createGood);
router.get("/", getAllGoods);
router.get("/:id", getOneGood);
router.put("/:id", updateGoodValidator, updateGood);
router.delete("/:id", deleteGood);

module.exports = router;
