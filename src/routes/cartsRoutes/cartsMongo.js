const express = require("express");
const cartsInMongo = express.Router();
const cartsMongoDAO = require("../../daos/carts/daoCartMongo")
const productsMongoDAO = require("../../daos/products/daoProductMongo")
const validateBody = require("../../middlewares/validateBody");

cartsInMongo.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});

cartsInMongo.get("/cart/products", async (req, res) => {
    try {
        const productsInCart= await cartsMongoDAO.find();
        if (!productsInCart) {
            return res.status(400).send("Producto no encontrado");
        }
        if (productsInCart.length===0){
            return res.status(200).send("Aun no tienes productos en el carrito");
        }
        return res.status(200).send(productsInCart);

    } catch (error) {
        return res.status(400).send({
            error: `An error occurred trying to read carts ${error.message}`,
        });
    }
});


cartsInMongo.post("/cart/products/:code", async (req, res) => {
    try {
        let productsInCart= await cartsMongoDAO.find();
        const producToFind = await productsMongoDAO.find(req.params);
        if (!producToFind) {
            return res.status(400).send("Producto no encontrado");
        }
        const addedProduct = new cartsMongoDAO(producToFind[0]);
        productsInCart.push(addedProduct);
        addedProduct.save();
        return res.status(200).send(productsInCart);

    } catch (error) {
        return res.status(400).send({
            error: `An error occurred trying to read carts ${error.message}`,
        });
    }
});

cartsInMongo.delete("/cart/products/:id", async (req, res) => {
    try {
        const productsInCart= await cartsMongoDAO.deleteOne(req.query);
        if (!productsInCart) {
            return res.status(400).send("Producto no encontrado");
        }

        return res.status(200).send(productsInCart);

    } catch (error) {
        return res.status(400).send({
            error: `An error occurred trying to read carts ${error.message}`,
        });
    }
});


module.exports = cartsInMongo;