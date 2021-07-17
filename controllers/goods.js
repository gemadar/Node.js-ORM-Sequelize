const { good, supplier } = require("../models");

class Goods {
  async createGood(req, res, next) {
    try {
      // Create good
      const newData = await good.create(req.body);

      // Find good with join
      const data = await good.findOne({
        where: {
          id: newData.id,
        },
        attributes: { exclude: ["id_supplier"] },
        include: [
          {
            model: supplier,
          },
        ],
      });

      res.status(201).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllGoods(req, res, next) {
    try {
      let data = await good.findAll({
        include: [{ model: good }],
      });

      if (data.length === 0) {
        return next({ statusCode: 404, messages: ["Goods not found"] });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  async getOneGood(req, res, next) {
    try {
      let data = await good.findOne({
        where: { id: req.params.id },
        include: [{ model: supplier }],
      });

      if (!data) {
        return next({ statusCode: 404, messages: ["Good not found"] });
      }

      res.status(200).json({ data });
    } catch (error) {
      next(Error);
    }
  }

  async updateGood(req, res, next) {
    try {
      const updateData = await good.update(req.body, {
        where: {
          id: req.params.id,
        },
      });

      if (updateData[0] === 0) {
        return next({ statusCode: 404, messages: ["Good not found"] });
      }

      const data = await good.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: supplier,
          },
        ],
      });

      res.status(201).json({ data });
    } catch (error) {
      next(Error);
    }
  }

  async deleteGood(req, res, next) {
    try {
      let data = await good.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!data) {
        return next({ statusCode: 404, messages: ["Good not found"] });
      }

      res.status(200).json({ message: "Success delete good" });
    } catch (error) {
      next(Error);
    }
  }
}

module.exports = new Goods();
