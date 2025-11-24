import express from "express";
import * as BankBranchController from "../controllers/BankBranchController";
import { VerifyToken, VerifyUser } from "../Authorization";

const bankBranchRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bank Branches
 *   description: Endpoints for Bank Branches List Management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllBankModels:
 *       type: object
 *       required:
 *         - id
 *         - bankId
 *         - branchName
 *         - ifscCode
 *         - address
 *         - isActive
 *       properties:
 *         id:
 *           type: number
 *         bankId:
 *           type: number
 *         branchName: 
 *           type: string
 *         ifscCode: 
 *           type: string
 *         address: 
 *           type: string
 *         isActive: 
 *           type: boolean
 */

/**
 * @swagger
 * /api/v1/bank/branches:
 *   get:
 *     tags: [Bank Branches]
 *     summary: Retrieve All Bank Branch List
 *     description: Retrieve Bank branches. If `id` query parameter is provided, it returns a single bank branch characteristic. Otherwise, it returns all bank branch characteristics.
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
 *                     $ref: '#/components/schemas/AllBankModels'
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
bankBranchRouter.get("/", VerifyToken, VerifyUser("Read", "Bank"), BankBranchController.GetAllBankBranches);

/**
 * @swagger
 * /api/v1/bank/branches:
 *   post:
 *     tags: [Bank Branches]
 *     summary: Create New Bank Branch
 *     description: Create a new Bank Branch.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AllBankModels'
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
bankBranchRouter.post("/", VerifyToken, VerifyUser("Create", "Bank"), BankBranchController.CreateBankBranch);

/**
 * @swagger
 * /api/v1/bank/branches:
 *   put:
 *     tags: [Bank Branches]
 *     summary: Update a Bank Branch Details
 *     description: Update an existing Bank Branch.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AllBankModels'
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
bankBranchRouter.put("/", VerifyToken, VerifyUser("Update", "Bank"), BankBranchController.UpdateBankBranch);

/**
 * @swagger
 * /api/v1/bank/branches/{id}:
 *   delete:
 *     tags: [Bank Branches]
 *     summary: Delete Bank Branch
 *     description: Delete a Bank Branch by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Bank Branch to delete
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
bankBranchRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "Bank"), BankBranchController.DeleteBankBranch);

export { bankBranchRouter };
