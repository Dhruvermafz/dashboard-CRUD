//userRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { verifyToken } = require("../services/authServices");
const { checkRole } = require("../middleware/checkRole");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and administration
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: User ID
 *         username:
 *           type: string
 *           description: Username of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *         roleId:
 *           type: integer
 *           description: ID of the role assigned to the user
 *       required:
 *         - username
 *         - password
 *         - roleId
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Returns all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", userController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to get
 *     responses:
 *       200:
 *         description: Returns the specified user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get("/:id", checkRole(1), userController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Add a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: New user created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post("/", userController.addUser);

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update an existing user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.patch("/:id", userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/:id", userController.deleteUser);

module.exports = router;
