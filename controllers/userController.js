const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "eMercado_JAP_266.5";


// logUser primero trae del model a todos los datos del usuario cuyo nombre sea igual al del request y luego verifica que la contraseña enviada se igual a la que está guardada.
const logUser = (req, res) => {
	const logInfo = userModel.logUser(req.body);
	console.log(logInfo);
	if (logInfo === "not_found") {
		res.status(500).json({ message: "Invalid username or password"})
	} else if (logInfo.password === req.body.password)	{
		const username = logInfo.username;
		const token = jwt.sign({ username }, SECRET_KEY);
		res.status(200).json({ token, "userID": logInfo.userID });
	} else {
		res.status(500).json({ message: "Invalid username or password"})
	};
};

const updateCart = (req, res) => {
	console.log(req.body.user);
	newCart = req.body.articles;
	userModel.updateCart(newCart, req.body.user);
	// console.log(logInfo);
	// if (logInfo === "not_found") {
		// res.status(500).json({ message: "Invalid username or password"})
	// } else if (logInfo.password === req.body.password)	{
		// const username = logInfo.username;
		// const token = jwt.sign({ username }, SECRET_KEY);
		// res.status(200).json({ token });
	// } else {
		// res.status(500).json({ message: "Invalid username or password"})
	// };
};




// const getUserById = (req, res) => {
//   const user = userModel.getUserById(req.params.id);
//   if (user) {
//     res.status(200).json(user);
//   } else {
//     res.status(404).json({ message: "Usuario no encontrado" });
//   }
// };

// const createUser = (req, res) => {
//   const createdUser = userModel.createUser(req.body);
//   if (createdUser) {
//     res.status(200).json(createdUser);
//   } else {
//     res.status(500).json({ message: "Ha ocurrido un error" });
//   }
// };

// const updateUser = (req, res) => {
//   const updatedUser = userModel.updateUser(req.params.id, req.body);
//   if (updatedUser) {
//     res.status(200).json(updatedUser);
//   } else {
//     res.status(404).json({ message: "Usuario no encontrado" });
//   }
// };

// const deleteUser = (req, res) => {
//   const deletedUser = userModel.deleteUser(req.params.id);
//   if (deletedUser) {
//     res.status(200).json(deletedUser);
//   } else {
//     res.status(404).json({ message: "Usuario no encontrado" });
//   }
// };

module.exports = {
	logUser,
	updateCart,
  // updateUser,
  // createUser,
  // deleteUser,
};
