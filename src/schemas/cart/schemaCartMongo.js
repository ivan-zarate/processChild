
const mongoose = require("mongoose");

const schemaCartOnMongo = new mongoose.Schema(
    [{
        _id:{type:Object, required:true},
        //timeStamp: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        code: { type: Number, required: true },
        url: { type: String, required: true},
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
    }], 
    {
        timestamps: true
    }
)

module.exports= schemaCartOnMongo