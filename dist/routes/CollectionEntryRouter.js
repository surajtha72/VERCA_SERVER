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
exports.collectionEntryRouter = void 0;
const express = __importStar(require("express"));
const CollectionEntryController_1 = require("../controllers/CollectionEntryController");
let collectionEntryRouter = express.Router();
exports.collectionEntryRouter = collectionEntryRouter;
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
collectionEntryRouter.post("/", CollectionEntryController_1.CreateCollectionEntry);
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
collectionEntryRouter.get("/", CollectionEntryController_1.GetCollectionEntry);
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
collectionEntryRouter.put("/", CollectionEntryController_1.UpdateCollectionEntry);
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
collectionEntryRouter.delete("/:id", CollectionEntryController_1.DeleteCollectionEntry);
