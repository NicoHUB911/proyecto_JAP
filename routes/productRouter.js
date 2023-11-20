/*
En este archivo se trabaja la lógica para responder las peticiones al servidor
*/
const express = require("express");
const productRouter = express.Router();

/* Controller */
const productCountroller = require("../controllers/productController");

productRouter.get("/category/", productCountroller.getCategories);

productRouter.get("/category/:categoryID", productCountroller.getCategoryByID);

// productRouter.post("/", marketController.createUser);

// productRouter.put("/:id", marketController.updateUser);

// productRouter.delete("/:id", marketController.deleteUser);

module.exports = productRouter;