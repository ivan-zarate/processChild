const mongoose = require("mongoose");

const schemaMessageOnMongo = new mongoose.Schema(
    {
        author:{
            id: { type: String, required: true },
            name: { type: String, required: true },
            lastname: { type: String, required: true },
            age: { type: Number, required: true},
            alias: { type: String, required: true },
            avatar: { type: String, required: true },
        },
        text:{ type: String, required: true },
        
    }, {
    timestamps: true
}
)

module.exports= schemaMessageOnMongo