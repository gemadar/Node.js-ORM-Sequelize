const validator = require("validator");

exports.createEmployeeValidator = async (req, res, next) => {
  if (!validator.isAlpha(req.body.name, "en-US", { ignore: " " })) {
    return next({
      statusCode: 400,
      message: "Employee name can only contains letters",
    });
  }
  next();
};

exports.updateEmployeeValidator = async (req, res, next) => {
  if (!validator.isAlpha(req.body.name, "en-US", { ignore: " " })) {
    return next({
      statusCode: 400,
      message: "Employee name can only contains letters",
    });
  }
  next();
};
