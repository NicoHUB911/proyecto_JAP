
const fs = require("fs");
const path = require("path");

const getCategories = () => {
	const filePath = path.join(__dirname, "../json/cats/cat.json");
	const dataCategories = fs.readFileSync(filePath, "utf-8");
	return JSON.parse(dataCategories);
};

const getCatByID = (categoryID) => {
  const filePath = path.join(__dirname, `../json/cats_products/${categoryID}`);
  const dataProducts = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(dataProducts);
};

const getProdByID = (productID) => {
  const filePath = path.join(__dirname, `../json/products/${productID}`);
  const productInfo = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(productInfo)
};

const getComments = (productID) => {
  const filePath = path.join(__dirname, `../json/products_comments/${productID}`);
  const comments = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(comments);
};

const getCart = (userID) => {
  const filePath = path.join(__dirname, `../json/user_cart/${userID}`);
  const cart = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(cart);
};

const getBuyMsg = () => {
  const filePath = path.join(__dirname, `../json/cart/buy.json`);
  const buyMSG = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(buyMSG);
};




// const getUserById = (id) => {
//   return users.find((user) => user.id === parseInt(id));
// };

// const updateUser = (id, updatedUser) => {
//   const index = users.findIndex((user) => user.id === parseInt(id));

//   if (index !== -1) {
//     users[index] = { ...users[index], ...updatedUser };

//     fs.writeFileSync(filePath, JSON.stringify(users), "utf-8");
//     return users[index];
//   }

//   return false;
// };

// const createUser = (newUser) => {
//   newUser.id = getNextId();
//   users.push(newUser);
//   fs.writeFileSync(filePath, JSON.stringify(users), "utf-8");
//   return newUser;
// };

// const deleteUser = (id) => {
//   const index = users.findIndex((user) => user.id === parseInt(id));

//   if (index !== -1) return users.splice(index, 1)[0];

//   return false;
// };

module.exports = {
  getCategories,
  getCatByID,
  getProdByID,
  getComments,
  getCart,
  getBuyMsg,
  // updateUser,
  // createUser,
  // deleteUser,
};
