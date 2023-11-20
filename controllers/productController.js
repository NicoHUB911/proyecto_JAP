const productModel = require("../models/productModel");

const getCategories = (req, res) => {
  res.json(productModel.getCategories());
};

const getCategoryByID = (req, res) => {
  const cat = productModel.getCatByID(req.params.categoryID);
  if (cat) {
    res.status(200).json(cat);
  } else {
    res.status(404).json({ message: "Category not found." });
  }
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
  getCategories,
  getCategoryByID,
  // updateUser,
  // createUser,
  // deleteUser,
};
