const express = require("express");

// Import validators
const {
	createSupplierValidator,
	updateSupplierValidator,
} = require("../middlewares/validators/supplier");

// Import controllers
const {
	getAllSuppliers,
	getSupplierById,
	createSupplier,
	updateSupplier,
	deleteSupplier,
} = require("../controllers/supplier");

const router = express.Router();

// It will find route that has / first after that it will find is it GET or POST
router
	.route("/")
	.get(getAllSuppliers)
	.post(createSupplierValidator, createSupplier);

// It will find route that has /:id first after that it will find is it GET or PUT or DELETE
router
	.route("/:id")
	.get(getSupplierById)
	.put(updateSupplierValidator, updateSupplier)
	.delete(deleteSupplier);

module.exports = router;
