import express from "express";
import * as BankController from "../controllers/BankController";
import { VerifyToken, VerifyUser } from "../Authorization";

const bankRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Banks
 *   description: Endpoints for Banks List Management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllBankModel:
 *       type: object
 *       required:
 *         - id
 *         - bankName
 *         - isActive
 *       properties:
 *         id:
 *           type: number
 *         bankName:
 *           type: string
 *         isActive: 
 *           type: boolean
 */

/**
 * @swagger
 * /api/v1/banks:
 *   get:
 *     tags: [Banks]
 *     summary: Retrieve All Bank List
 *     description: Retrieve Banks. If `id` query parameter is provided, it returns a single bank characteristic. Otherwise, it returns all bank characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the bank
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
 *                     $ref: '#/components/schemas/AllBankModel'
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
bankRouter.get("/", VerifyToken, VerifyUser("Read", "Bank"), BankController.GetAllBanks);

/**
 * @swagger
 * /api/v1/banks:
 *   post:
 *     tags: [Banks]
 *     summary: Create New Bank
 *     description: Create a new bank.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AllBankModel'
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
bankRouter.post("/", VerifyToken, VerifyUser("Create", "Bank"), BankController.CreateBank);

/**
 * @swagger
 * /api/v1/banks:
 *   put:
 *     tags: [Banks]
 *     summary: Update a Bank Details
 *     description: Update an existing bank.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AllBankModel'
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
bankRouter.put("/", VerifyToken, VerifyUser("Update", "Bank"), BankController.UpdateBank);

/**
 * @swagger
 * /api/v1/banks/{id}:
 *   delete:
 *     tags: [Banks]
 *     summary: Delete Bank
 *     description: Delete a bank by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the bank to delete
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
bankRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "Bank"), BankController.DeleteBank);

export { bankRouter };
