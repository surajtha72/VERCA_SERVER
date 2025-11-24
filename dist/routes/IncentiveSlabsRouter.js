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
exports.slabRouter = void 0;
const express = __importStar(require("express"));
const IncentiveSlabsController = __importStar(require("../controllers/IncentiveSlabsController"));
const Authorization_1 = require("../Authorization");
let slabRouter = express.Router();
exports.slabRouter = slabRouter;
/**
 * @swagger
 * tags:
 *   name: IncentiveSlabs
 *   description: Endpoints for Incentive Slabs management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     All:
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
 * /api/v1/incentive_slab:
 *   get:
 *     tags: [IncentiveSlabs]
 *     summary: Retrieve Incentive Slabs
 *     description: Retrieve All Incentive Slabs. If `id` query parameter is provided, it returns a single incentive slab. Otherwise, it returns all incentive slab.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the incentive slab
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
 *                     $ref: '#/components/schemas/AllIncentiveSlabsModel'
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
slabRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "IncentiveList"), IncentiveSlabsController.GetAllIncentiveSlabs);
/**
 * @swagger
 * /api/v1/incentive_slab:
 *   post:
 *     summary: Create Incentive Slab
 *     description: This API endpoint allows to Create a new incentive slab.
 *     tags: [IncentiveSlabs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "incenitve"
 *                 stateCode:
 *                   type: string
 *                   example: "incentive"
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
slabRouter.post("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "IncentiveList"), IncentiveSlabsController.CreateIncentiveSlabs);
/**
 * @swagger
 * /api/v1/incentive_slab:
 *   put:
 *     summary: Update a Incentive Slabs
 *     description: This API endpoint allows to Update a new incentive slab.
 *     tags: [IncentiveSlabs]
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
 *                   example: "incentivePerKg"
 *                 stateCode:
 *                   type: string
 *                   example: "incentivePerKg"
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
slabRouter.put("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Update", "IncentiveList"), IncentiveSlabsController.UpdateIncentiveSlabs);
/**
 * @swagger
 * /api/v1/incentive_slab/{id}:
 *   delete:
 *     summary: Delete Incentive Slabs
 *     description: This API endpoint deletes a Incentive slab based on the provided ID.
 *     tags: [IncentiveSlabs]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Incentive to delete
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
slabRouter.delete("/:id", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Delete", "IncentiveList"), IncentiveSlabsController.DeleteIncentiveSlabs);
