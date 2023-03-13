const express = require("express");
const chatInMongo = express.Router();
const messagesMongoDAO=require("../../daos/messages/daoMessagesMongo")
const validateBody = require("../../middlewares/validateBody");

chatInMongo.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

chatInMongo.post("/messages", express.json(), async (req, res) => {

    try {
        const message = await messagesMongoDAO(req.body);
        message.save();
        return res.status(200).send(message);
      } catch (error) {
        return res.status(400).send({
          error: `An error occurred trying to read products ${error.message}`,
        });
      }
    });
  
  module.exports = chatInMongo;