const { supplier } = require("../models");

class Supplier {
	async getAllSuppliers(req, res, next) {
		try {
			const data = await supplier.findAll({
				attributes: ["id", "name"],
			});
			res.status(200).json({ data });
		} catch (e) {
			// If error
			next(e);
		}
	}

	async getSupplierById(req, res, next) {
		try {
			const data = await supplier.findOne({
				attributes: ["id", "name"],
				where: {
					id: req.params.id,
				},
			});
			if (!data) {
				return next({ statusCode: 404, messages: ["Supplier not found"] });
			}
			res.status(200).json({ data });
		} catch (e) {
			// If error
			next(e);
		}
	}

	async createSupplier(req, res, next) {
		try {
			const create = await supplier.create(req.body);
			const data = await supplier.findOne({
				attributes: ["id", "name"],
				where: {
					id: create.id,
				},
			});
			res.status(201).json({ data });
		} catch (e) {
			// If error
			next(e);
		}
	}

	async updateSupplier(req, res, next) {
		try {
			const update = await supplier.update(req.body, {
				where: {
					id: req.params.id,
				},
			});
			if (update[0] === 0) {
				return next({ statusCode: 404, messages: ["Supplier not found"] });
			}
			const data = await supplier.findOne({
				attributes: ["id", "name"],
				where: {
					id: req.params.id,
				},
			});
			res.status(201).json({ data });
		} catch (e) {
			// If error
			next(e);
		}
	}

	async deleteSupplier(req, res, next) {
		try {
			let data = await supplier.destroy({
				where: {
					id: req.params.id,
				},
			});
			if (!data) {
				return next({ statusCode: 404, messages: ["Supplier not found"] });
			}
			res.status(200).json({ message: "Success delete supplier" });
		} catch (e) {
			// If error
			next(e);
		}
	}
}

module.exports = new Supplier();
