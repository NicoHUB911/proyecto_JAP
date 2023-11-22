
const fs = require("fs");
const path = require("path");

// esta funcion busca entre todos los usuarios al que tenga el nombre dado y devuelve todos los datos del mismo. En caso de no encontrar devuelve un string "not_found"
const logUser = (attempt) => {
	const filePath = path.join(__dirname, "../json/users.json");
	const allUsers = fs.readFileSync(filePath, "utf-8");
	const user = JSON.parse(allUsers).find(u => u.username === attempt.username) ?? "not_found";
	return user;
};

const updateCart = (newCart, userID) => {
	const filePath = path.join(__dirname, `../json/user_cart/${userID}.json`);
	const object = {};
	object["user"] = userID;
	object["articles"] = newCart;
	const cartToSave = JSON.stringify(object);
	fs.writeFileSync(filePath, cartToSave);
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
	logUser,
	updateCart,
  // updateUser,
  // createUser,
  // deleteUser,
};
