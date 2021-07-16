const validator = require("validator");

exports.createSupplierValidator = async (req, res, next) => {
	if (!validator.isAlpha(req.body.name, "en-US", { ignore: " " })) {
		return next({ statusCode: 400, message: "name can only contains letters" });
	}
	next();
};

exports.updateSupplierValidator = async (req, res, next) => {
	if (!validator.isAlpha(req.body.name, "en-US", { ignore: " " })) {
		return next({ statusCode: 400, message: "name can only contains letters" });
	}
	next();
};
