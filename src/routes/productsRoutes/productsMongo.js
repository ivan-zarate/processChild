const express = require("express");
const productsInMongo = express.Router();
const productsMongoDAO=require("../../daos/products/daoProductMongo")
const validateBody = require("../../middlewares/validateBody");
const validateUser = require("../../middlewares/validateUser");

productsInMongo.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

productsInMongo.get("/products", async (req, res) => {
  try {
    const readProducts= await productsMongoDAO.find();
    return res.status(200).send(readProducts);
  } catch (error) {
    return res.status(400).send({
      error: `An error occurred trying to read products ${error.message}`,
    });
  }
});

productsInMongo.post("/products", validateBody,validateUser, async (req, res) => {
  try {
    //const createProduct = await productsMongoDAO.updateOne(req.body);
    const newProduct = new productsMongoDAO(req.body);
    newProduct.save();
    return res.status(200).send(newProduct);
  } catch (error) {
    return res.status(400).send({
      error: `An error occurred trying to read products ${error.message}`,
    });
  }
});

productsInMongo.put("/products/:_id", validateBody,validateUser,  async (req, res) => {
    try {
      const result = await productsMongoDAO.updateOne(req.params,req.body);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(400).send({
        error: `An error occurred trying to read products ${error.message}`,
      });
    }
  });

productsInMongo.delete("/products/:code", validateUser, async (req, res) => {
    try {
      const result = await productsMongoDAO.deleteOne(req.params);
      return res.status(200).send(result);
    } catch (error) {
      return res.status(400).send({
        error: `An error occurred trying to read products ${error.message}`,
      });
    }
  });
  

module.exports = productsInMongo;