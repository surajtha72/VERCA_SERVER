import * as express from "express";
import * as UserController from "../controllers/UserController";
import { VerifyToken, VerifyUser } from "../Authorization";
import {
  CreateCollectionEntry,
  GetCollectionEntry,
  UpdateCollectionEntry,
  DeleteCollectionEntry
} from "../controllers/CollectionEntryController";
let collectionEntryRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Collection Entry
 *   description: Endpoints for User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllUsersModel:
 *       type: object
 *       required:
 *         - organizationUnitId
 *         - requestedFor
 *       properties:
 *         id:
 *           type: number
 *         aadhaarNo:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/collection_entry:
 *   post:
 *     summary: Check collection entry
 *     description: Check if collection entry is allowed for a user.
 *     tags: [Collection Entry]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               aadhaarNo:
 *                 type: string
 *                 example: "allow collection"
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
 *                   example: "SUCCESS"
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
 *                   example: "Not allowed"
 */
collectionEntryRouter.post("/", CreateCollectionEntry);

/**
 * @swagger
 * /api/v1/collection_entry:
 *   get:
 *     tags: [Collection Entry]
 *     summary: Retrieve All Contracts
 *     description: Retrieve all contracts. If `id` query parameter is provided, it returns a single contract. Otherwise, it returns all contracts.
 *     parameters:
 *       - in: query
 *         name: organizationUnitId
 *         schema:
 *           type: integer
 *         description: Org Id of the entry
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
collectionEntryRouter.get("/", GetCollectionEntry);

/**
 * @swagger
 * /api/v1/collection_entry:
 *   put:
 *     tags: [Collection Entry]
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
collectionEntryRouter.put("/", UpdateCollectionEntry);

/**
 * @swagger
 * /api/v1/collection_entry/{id}:
 *   delete:
 *     tags: [Collection Entry]
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
collectionEntryRouter.delete("/:id", DeleteCollectionEntry);

export { collectionEntryRouter };
