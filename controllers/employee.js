const { employee } = require("../models");

class Employee {
  async readAllEmployees(req, res, next) {
    try {
      const data = await employee.findAll({
        attributes: ["id", "name"],
      });
      res.status(200).json({ data });
    } catch (errpr) {
      next(error);
    }
  }

  async readEmployeeById(req, res, next) {
    try {
      const data = await employee.findOne({
        attributes: ["id", "name"],
        where: {
          id: req.params.id,
        },
      });
      if (!data) {
        return next({
          statusCode: 404,
          messages: [`The employee by id: ${req.params.id} not found`],
        });
      }
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async createEmployee(req, res, next) {
    try {
      const createNewEmployee = await employee.create(req.body);
      const newEmployee = await employee.findOne({
        attributes: ["id", "name"],
        where: {
          id: createNewEmployee.id,
        },
      });
      res.status(201).json({ newEmployee });
    } catch (error) {
      next(error);
    }
  }

  async updateEmployee(req, res, next) {
    try {
      const updateEmployee = await employee.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (updateEmployee[0] === 0) {
        return next({
          statusCode: 404,
          messages: [`The employee by id: ${req.params.id} not found`],
        });
      }
      const updatedEmployee = await employee.findOne({
        attributes: ["id", "name"],
        where: {
          id: req.params.id,
        },
      });
      res.status(201).json({ updatedEmployee });
    } catch (error) {
      next(error);
    }
  }

  async deleteEmployee(req, res, next) {
    try {
      let data = await employee.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!data) {
        return next({
          statusCode: 404,
          messages: [`The employee by id: ${req.params.id} not found`],
        });
      }
      res
        .status(200)
        .json({ message: "The employee has ben successfully deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new Employee();
