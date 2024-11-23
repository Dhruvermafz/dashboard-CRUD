//authController.js

const bcrypt = require("bcryptjs");

const { generateToken } = require("../services/authServices");

const User = require("../services/usersServices");
const Role = require("../services/rolesServices");

const register = (req, res) => {
  const { username, password, roleId } = req.body;
  if (!username || !password || !roleId) {
    return res
      .status(400)
      .send({ message: "Username, password, and role ID are required." });
  }
  const role = Role.getRoleById(roleId);
  if (!role) {
    return res.status(404).send({ message: "Role not found." });
  }
  const newUser = { username, password, roleId };
  const user = User.addUser(newUser);
  const token = generateToken(user);
  res.status(201).send({ auth: true, token });
};

// Mock JSON user data
const users = [
  {
    username: "user4",
    password: "$2a$08$y/T//JOL52OaeOxJbLs2Uu0uzzYdKZFY5xtayXXVJoalxkcvXn9X.",
    roleId: 1,
    id: 1,
  },
  {
    username: "user5",
    password: "$2a$08$GqT2Mg5UJAX.yp02N8eyN.Nw80VFnY7lvF7h5nXPZ7nZ.dCab.yzq",
    roleId: 2,
    id: 3,
  },
  {
    username: "user6",
    password: "$2a$08$tbu74IIlfTDtj6MzWAEwluxDmRFmfKCOGOEJLtu7qoGhA9iZKXFai",
    roleId: 2,
    id: 4,
  },
  {
    username: "user67",
    password: "$2a$08$GtC9XZDWsqLjXmSohFNYhuKXe33/twp8H2VrgqYOJnqKmqaEtBBk2",
    roleId: 1,
    id: 5,
  },
  {
    username: "usernew",
    password: "11223344", // Plaintext password
    roleId: 1,
    id: 6,
  },
  {
    username: "user637",
    password: "$2a$08$PsHuc7Cct3c8asqCFTbLSuPyN5O.mvJIun25nOc69p5iGtTHFEnfG",
    roleId: 1,
    id: 7,
  },
];

const login = (req, res) => {
  const { username, password } = req.body;

  // Find the user in the JSON file
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).send({ message: "User not found." });
  }

  // Check if the password matches
  let passwordIsValid = false;
  if (user.username === "usernew") {
    // Direct comparison for plaintext password
    passwordIsValid = password === user.password;
  } else {
    // Use bcrypt for hashed passwords
    passwordIsValid = bcrypt.compareSync(password, user.password);
  }

  if (!passwordIsValid) {
    return res.status(401).send({ message: "Invalid password." });
  }

  // Respond with user details upon successful login
  res.status(200).send({
    message: "Login successful.",
    user: {
      id: user.id,
      username: user.username,
      roleId: user.roleId,
    },
  });
};

module.exports = { register, login };
