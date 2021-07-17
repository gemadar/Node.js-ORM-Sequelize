const validator = require("validator");
const { customer } = require("../../models");

exports.createOrUpdateCustomerValidator = async (req, res, next) => {
  try {
    const errorMessages = [];

    if (!validator.isEmpty(req.body.name)) {
      errorMessages.push("Name cannot be empty!");
    }

    if (!validator.isAlpha(req.body.name, "en-US", { ignore: " " })) {
      errorMessages.push("Please use letters only");
    }

    if (errorMessages.length === 0) {
      return next({ statusCode: 400, messages: errorMessages });
    }
    next();
  } catch (error) {
    next(error);
  }
};
