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
exports.statesRouter = void 0;
const express = __importStar(require("express"));
const StatesController = __importStar(require("../controllers/StatesController"));
const Authorization_1 = require("../Authorization");
let statesRouter = express.Router();
exports.statesRouter = statesRouter;
/**
 * @swagger
 * tags:
 *   name: States
 *   description: Endpoints for States management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AllStatesModel:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         stateCode:
 *           type: string
 */
/**
 * @swagger
 * /api/v1/states:
 *   get:
 *     tags: [States]
 *     summary: Retrieve States
 *     description: Retrieve All States. If `id` query parameter is provided, it returns a single state. Otherwise, it returns all states.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the state
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
 *                     $ref: '#/components/schemas/AllStatesModel'
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
statesRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "States"), StatesController.GetAllStates);
/**
 * @swagger
 * /api/v1/states:
 *   post:
 *     summary: Create State
 *     description: This API endpoint allows to Create a new State.
 *     tags: [States]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "state"
 *                 stateCode:
 *                   type: string
 *                   example: "state"
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
statesRouter.post("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "States"), StatesController.CreateState);
/**
 * @swagger
 * /api/v1/states:
 *   put:
 *     summary: Update a State
 *     description: This API endpoint allows to Update a new State.
 *     tags: [States]
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
 *                 name:
 *                   type: string
 *                   example: "stateName"
 *                 stateCode:
 *                   type: string
 *                   example: "stateName"
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
statesRouter.put("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Update", "States"), StatesController.UpdateState);
/**
 * @swagger
 * /api/v1/states/{id}:
 *   delete:
 *     summary: Delete State
 *     description: This API endpoint deletes a State based on the provided ID.
 *     tags: [States]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the State to delete
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
statesRouter.delete("/:id", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Delete", "States"), StatesController.DeleteState);
