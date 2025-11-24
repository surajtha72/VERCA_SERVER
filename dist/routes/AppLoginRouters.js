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
exports.appLoginRouter = void 0;
const express = __importStar(require("express"));
const LoginController = __importStar(require("../controllers/LoginController"));
let appLoginRouter = express.Router();
exports.appLoginRouter = appLoginRouter;
/**
 * @swagger
 * tags:
 *   name: App Login
 *   description: Endpoints for App Login management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - deviceId
 *       properties:
 *         username:
 *           type: string
 *           description: The username
 *         password:
 *           type: string
 *           description: password to the particular user
 *         deviceId:
 *           type: string
 *           description: particular device id
 *     ChangePassword:
 *       type: object
 *       required:
 *         - username
 *         - oldPassword
 *         - newPassword
 *       properties:
 *         username:
 *           type: string
 *           description: The username
 *         oldPassword:
 *           type: string
 *           description: old password to the particular user
 *         newPassword:
 *           type: string
 *           description: new password to the particular user
 *     APIResponse:
 *       type: object
 *       required:
 *         - status
 *         - message
 *       properties:
 *         status:
 *           type: integer
 *           description: The HTTP status code
 *         message:
 *           type: string
 *           description: The response message
 *     ServiceResponse:
 *       type: object
 *       allOf:
 *         - $ref: '#/components/schemas/APIResponse'
 *         - type: object
 *       properties:
 *         data:
 *           type: object
 *           description: The response data
 *           example: { "username": "string","accessToken":"string" }
 */
/**
 * @swagger
 * /api/v1/app_login:
 *   post:
 *     summary: Login user
 *     description: Authenticate and log in a user based on their username and password.
 *     tags: [App Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *           example:
 *             username:
 *             password:
 *             deviceId:
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceResponse'
 *             example:
 *               status: 200
 *               message: "Success"
 *               data:
 *                 username: "example@example.com"
 *                 accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
 *                 roleId: 0
 *                 roleName: "string"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceResponse'
 *             example:
 *               status: 500
 *               message: "Internal server error"
 */
appLoginRouter.post("/", LoginController.AppLogin);
/**
 * @swagger
 * /api/v1/app_login/change_password:
 *   post:
 *     summary: Change password
 *     description: Change password using the users username and old password.
 *     tags: [App Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePassword'
 *           example:
 *             username:
 *             oldPassword:
 *             newPassword:
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceResponse'
 *             example:
 *               status: 200
 *               message: "Success"
 *               data: null
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceResponse'
 *             example:
 *               status: 500
 *               message: "Internal server error"
 */
appLoginRouter.post("/change_password", LoginController.ChangeAppLoginPassword);
