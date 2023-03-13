const schemaProductOnMongo= require("../../schemas/product/schemaProductMongo");
const mongoose = require("mongoose");

const productsMongoDAO=mongoose.model('products', schemaProductOnMongo);

module.exports=productsMongoDAO
