"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express = __importStar(require("express"));
const UserController = __importStar(require("../controllers/UserController"));
const Authorization_1 = require("../Authorization");
let userRouter = express.Router();
exports.userRouter = userRouter;
/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints for User management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AllUsersModel:
 *       type: object
 *       required:
 *         - id
 *         - organizationUnitTypeId
 *         - organizationUnitId
 *         - name
 *         - address
 *         - mobileNo
 *         - emailId
 *         - roleId
 *         - aadhaarNo
 *         - panNo
 *         - bankAccNo
 *         - bankName
 *         - bankBranchId
 *         - username
 *         - password
 *         - isActive
 *       properties:
 *         id:
 *           type: number
 *         organizationUnitTypeId:
 *           type: number
 *         organizationUnitId:
 *           type: number
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         mobileNo:
 *           type: string
 *         emailId:
 *           type: string
 *         roleId:
 *           type: number
 *         aadhaarNo:
 *           type: string
 *         panNo:
 *           type: string
 *         bankAccNo:
 *           type: string
 *         bankAccName:
 *           type: string
 *         bankBranchId:
 *           type: number
 *         userName:
 *           type: string
 *         password:
 *           type: string
 *         isActive:
 *           type: number
 */
/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     tags: [User]
 *     summary: Retrieve All the Users
 *     description: Retrieve Users. If either `id` or `roleId` query parameter is provided, it returns the corresponding user(s). Otherwise, it returns all the users.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the user
 *       - in: query
 *         name: organizationUnitId
 *         schema:
 *           type: integer
 *         description: ID of the organization Unit
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Success"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AllUsersModel'
 *       '500':
 *         description: "Internal Server Error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 data:
 *                   type: object
 *                   example: null
 */
userRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "Users"), UserController.GetAllUsers);
/**
 * @swagger
 * /api/v1/user:
 *   post:
 *     summary: Create user
 *     description: This API endpoint allows to Create New user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 organizationUnitTypeId:
 *                   type: integer
 *                   example: 1
 *                 organizationUnitId:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                 address:
 *                   type: string
 *                 mobileNo:
 *                   type: string
 *                 emailId:
 *                   type: string
 *                 roleId:
 *                   type: number
 *                   example: 1
 *                 stateId:
 *                   type: integer
 *                   example: 1
 *                 districtId:
 *                   type: integer
 *                   example: 1
 *                 vctId:
 *                   type: integer
 *                   example: 1
 *                 aadhaarNo:
 *                   type: string
 *                 panNo:
 *                   type: string
 *                 bankAccNo:
 *                   type: string
 *                 bankAccName:
 *                   type: string
 *                 bankBranchId:
 *                   type: string
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Added Successfully"
 *       '400':
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
userRouter.post("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "Users"), UserController.CreateUser);
/**
 * @swagger
 * /api/v1/user:
 *   put:
 *     summary: Update an User
 *     description: This API endpoint allows to Update an Existing User.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 organizationUnitTypeId:
 *                   type: integer
 *                   example: 1
 *                 organizationUnitId:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                 address:
 *                   type: string
 *                 mobileNo:
 *                   type: string
 *                 emailId:
 *                   type: string
 *                 roleId:
 *                   type: integer
 *                   example: 1
 *                 stateId:
 *                   type: integer
 *                   example: 1
 *                 districtId:
 *                   type: integer
 *                   example: 1
 *                 vctId:
 *                   type: integer
 *                   example: 1
 *                 aadhaarNo:
 *                   type: string
 *                 panNo:
 *                   type: string
 *                 bankAccNo:
 *                   type: string
 *                 bankAccName:
 *                   type: string
 *                 bankBranchId:
 *                   type: string
 *                 username:
 *                   type: string
 *                 password:
 *                   type: string
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Updated Successfully"
 *       '400':
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
userRouter.put("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Update", "Users"), UserController.UpdateUser);
/**
 * @swagger
 * /api/v1/user/{id}:
 *   delete:
 *     summary: Delete User
 *     description: This API endpoint deletes a User With the provided ID.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the User to delete
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Deleted Successfully"
 *       '400':
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */
userRouter.delete("/:id", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Delete", "Users"), UserController.DeleteUser);
