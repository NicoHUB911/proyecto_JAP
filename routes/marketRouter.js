/*
En este archivo se trabaja la lógica para responder las peticiones al servidor
*/
const express = require("express");
const marketRouter = express.Router();

const marketController = require("../controllers/marketController");

marketRouter.get("/", marketController.getUsers);

marketRouter.get("/:id", marketController.getUserById);

marketRouter.post("/", marketController.createUser);

marketRouter.put("/:id", marketController.updateUser);

marketRouter.delete("/:id", marketController.deleteUser);

module.exports = marketRouter;
