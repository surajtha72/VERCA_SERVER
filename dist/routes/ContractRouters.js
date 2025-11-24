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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contractsRouter = void 0;
const express_1 = __importDefault(require("express"));
const ContractController = __importStar(require("../controllers/ContractController"));
const Authorization_1 = require("../Authorization");
const contractsRouter = express_1.default.Router();
exports.contractsRouter = contractsRouter;
/**
 * @swagger
 * tags:
 *   name: Contracts
 *   description: Endpoints for Contracts management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AllContractModel:
 *       type: object
 *       required:
 *         - id
 *         - transporterId
 *         - routeId
 *         - vehicleId
 *         - startDate
 *         - endDate
 *         - payTerms
 *         - payAmount
 *         - addlChargeType
 *         - addlChargeAmount
 *         - status
 *         - isActive
 *       properties:
 *         id:
 *           type: number
 *         transporterId:
 *           type: number
 *         routeId:
 *           type: number
 *         vehicleId:
 *           type: number
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         payTerms:
 *           type: string
 *         payAmount:
 *           type: number
 *         addlChargeType:
 *           type: string
 *         addlChargeAmount:
 *           type: number
 *         status:
 *           type: string
 *         isActive:
 *           type: boolean
 */
/**
 * @swagger
 * /api/v1/transporters/contracts:
 *   get:
 *     tags: [Contracts]
 *     summary: Retrieve All Contracts
 *     description: Retrieve all contracts. If `id` query parameter is provided, it returns a single contract. Otherwise, it returns all contracts.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the contract
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
 *                     $ref: '#/components/schemas/AllContractModel'
 *       '500':
 *         description: Internal Server Error
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
contractsRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "Vehicles"), ContractController.GetAllContracts);
/**
 * @swagger
 * /api/v1/transporters/contracts:
 *   post:
 *     tags: [Contracts]
 *     summary: Create Contract
 *     description: Create a new contract.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AllContractModel'
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
contractsRouter.post("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "Vehicles"), ContractController.CreateContract);
/**
 * @swagger
 * /api/v1/transporters/contracts:
 *   put:
 *     tags: [Contracts]
 *     summary: Update Contract
 *     description: Update an existing contract.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AllContractModel'
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
contractsRouter.put("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Update", "Vehicles"), ContractController.UpdateContract);
/**
 * @swagger
 * /api/v1/transporters/contracts/{id}:
 *   delete:
 *     tags: [Contracts]
 *     summary: Delete Contract
 *     description: Delete a contract by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the contract to delete
 *         required: true
 *         schema:
 *           type: integer
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
contractsRouter.delete("/:id", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Delete", "Vehicles"), ContractController.DeleteContract);
