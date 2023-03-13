const dotenv=require("dotenv");
dotenv.config();

const config={
    MONGO_URL: process.env.MONGO_URL || "http://mongo/",
    CLAVE_SECRETA:process.env.CLAVE_SECRETA
}

module.exports= config;