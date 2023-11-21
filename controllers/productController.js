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

const getProductByID = (req, res) => {
  const prod = productModel.getProdByID(req.params.productID);
  if (prod) {
    res.status(200).json(prod);
  } else {
    res.status(404).json({ message: "Product not found." });
  }
};

const getComments = (req, res) => {
  const comments = productModel.getComments(req.params.productID);
  if (comments) {
    res.status(200).json(comments);
  } else {
    res.status(404).json({ message: "No comments found." });
  }
};


// following 2 functions aren't used in the site but were added for API compatibility.
const getCart = (req, res) => {
  const cart = productModel.getCart(req.params.userID);
  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(404).json({ message: "User doesn't have a cart stored" });
  }
};

const getBuyMsg = (req, res) => {
	res.json(productModel.getBuyMsg());
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
  getProductByID,
  getComments,
  getCart,
  getBuyMsg,
  // updateUser,
  // createUser,
  // deleteUser,
};
