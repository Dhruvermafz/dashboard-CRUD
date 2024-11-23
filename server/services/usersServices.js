const fs = require("fs");
const bcrypt = require("bcryptjs");
const filePath = "./data/users.json";

function loadUsers() {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
    return [];
  }
}

function saveUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null));
}

module.exports = {
  // Retrieve all users
  getAllUsers() {
    return loadUsers();
  },

  // Retrieve a user by their ID
  getUserById(id) {
    const users = loadUsers();
    return users.find((user) => user.id === id);
  },

  // Add a new user
  addUser(user) {
    const users = loadUsers();
    user.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    user.password = bcrypt.hashSync(user.password, 8); // Encrypt the password
    users.push(user);
    saveUsers(users);
    return user;
  },

  // Update an existing user
  updateUser(id, updatedUser) {
    const users = loadUsers();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null;
    }
    updatedUser.password = bcrypt.hashSync(updatedUser.password, 8); // Encrypt the new password
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    saveUsers(users);
    return users[userIndex];
  },

  // Delete a user by their ID
  deleteUser(id) {
    const users = loadUsers();
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null;
    }
    const deletedUser = users.splice(userIndex, 1);
    saveUsers(users);
    return deletedUser;
  },
};
