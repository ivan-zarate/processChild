const mongoose = require("mongoose");

const connection = async () => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.set('debug', true);
    return mongoose.connect(
      `mongodb+srv://ivanzarate:Estela12@cluster0.jrymifn.mongodb.net/ecommerce`,
      {
        serverSelectionTimeoutMS: 5000
      }
    );
  } catch (error) {
    throw new Error(
      `An error occurred trying to connect to mongoDB ${error.message}`
    );
  }
};

module.exports = connection;

