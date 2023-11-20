
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../json/cats/cat.json");

const dataCategories = fs.readFileSync(filePath, "utf-8");
const categories = JSON.parse(dataCategories);

const getCategories = () => {
  return categories;
};

const getCatByID = (categoryID) => {
  const filePath = path.join(__dirname, `../json/cats_products/${categoryID}.json`);
  const dataProducts = fs.readFileSync(filePath, "utf-8");
  const products = JSON.parse(dataProducts);
  return products
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
  // updateUser,
  // createUser,
  // deleteUser,
};
