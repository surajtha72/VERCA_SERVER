import express from "express";
import * as ContractController from "../controllers/ContractController";
import { VerifyToken, VerifyUser } from "../Authorization";

const contractsRouter = express.Router();

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
contractsRouter.get("/", VerifyToken, VerifyUser("Read", "Vehicles"), ContractController.GetAllContracts);

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
contractsRouter.post("/", VerifyToken, VerifyUser("Create", "Vehicles"), ContractController.CreateContract);

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
contractsRouter.put("/", VerifyToken, VerifyUser("Update", "Vehicles"), ContractController.UpdateContract);

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
contractsRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "Vehicles"), ContractController.DeleteContract);

export { contractsRouter };
