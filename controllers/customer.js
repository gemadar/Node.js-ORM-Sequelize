const { customer } = require("../models");

class Customer {
  async createCustomer(req, res, next) {
    try {
      const newCustomer = await customer.create(req.body);

      const dataCustomers = await customer.findOne({
        attributes: ["id", "name"],
        where: { id: newCustomer.id },
      });

      res.status(201).json({ dataCustomers });
    } catch (error) {
      next(error);
    }
  }

  async getCustomer(req, res, next) {
    try {
      const dataCustomers = await customer.findAll({
        attributes: ["id", "name"],
      });

      if (dataCustomers.length === 0) {
        return next({ statusCode: 404, messages: ["Customer not found"] });
      }

      res.status(200).json({
        dataCustomers,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCustomerById(req, res, next) {
    try {
      const dataCustomers = await customer.findOne({
        attributes: ["id", "name"],
        where: {
          id: req.params.id,
        },
      });

      if (!dataCustomers) {
        return next({ statusCode: 404, messages: ["Customer not found"] });
      }

      res.status(200).json({ dataCustomers });
    } catch (error) {
      next(error);
    }
  }

  async updateCustomer(req, res, next) {
    try {
      const updateCustomer = await customer.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      if (updateCustomer[0] === 0) {
        return next({ statusCode: 404, messages: ["Customer not found"] });
      }

      const dataCustomers = await customer.findOne({
        attributes: ["id", "name"],
        where: {
          id: req.params.id,
        },
      });

      res.status(201).json({ dataCustomers });
    } catch (error) {
      next(error);
    }
  }

  async deleteCustomer(req, res, next) {
    try {
      let dataCustomers = await customer.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!dataCustomers) {
        return next({ statusCode: 404, messages: ["Customer not found!"] });
      }

      res.status(200).json({ message: "Customer has been deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Customer();
