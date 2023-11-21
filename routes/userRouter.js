/*
En este archivo se trabaja la lógica para responder las peticiones al servidor
*/
const express = require("express");
const userRouter = express.Router();

/* Controller */
const userController = require("../controllers/userController");

userRouter.post("/login", userController.logUser);

// userRouter.put("/:id", userController.updateUser);

// userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;