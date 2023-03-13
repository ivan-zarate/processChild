const schemaCartOnMongo= require("../../schemas/cart/schemaCartMongo");
const mongoose = require("mongoose");

const cartsMongoDAO=mongoose.model('carts', schemaCartOnMongo);

module.exports=cartsMongoDAO