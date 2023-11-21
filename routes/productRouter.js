/*
En este archivo se trabaja la lógica para responder las peticiones al servidor
*/
const express = require("express");
const productRouter = express.Router();

/* Controller */
const productCountroller = require("../controllers/productController");

productRouter.get("/cats/", productCountroller.getCategories);

productRouter.get("/cats_products/:categoryID", productCountroller.getCategoryByID);

productRouter.get("/products/:productID", productCountroller.getProductByID);

productRouter.get("/products_comments/:productID", productCountroller.getComments);

productRouter.get("/cart/buy.json", productCountroller.getBuyMsg);

productRouter.get("/user_cart/:userID", productCountroller.getCart);

// productRouter.post("/", marketController.createUser);

// productRouter.put("/:id", marketController.updateUser);

// productRouter.delete("/:id", marketController.deleteUser);

module.exports = productRouter;