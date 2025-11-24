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
exports.rateAppliedRouter = void 0;
const express_1 = __importDefault(require("express"));
const RateAppliedController = __importStar(require("../controllers/RateAppliedController"));
const Authorization_1 = require("../Authorization");
const rateAppliedRouter = express_1.default.Router();
exports.rateAppliedRouter = rateAppliedRouter;
/**
 * @swagger
 * tags:
 *   name: Rate Applied
 *   description: Endpoints for Rate Applied
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AllRateAppliedModel:
 *       type: object
 *       required:
 *         - id
 *         - rateId
 *         - appliedTo
 *         - appliedOn
 *       properties:
 *         id:
 *           type: number
 *         rateId:
 *           type: number
 *         appliedTo:
 *           type: string
 *         appliedOn:
 *           type: string
 *           format: date-time
 */
/**
 * @swagger
 * /api/v1/rate_applied:
 *   get:
 *     tags: [Rate Applied]
 *     summary: Retrieve Rate Applied
 *     description: Retrieve all Rate Applied Characteristics. If `id` query parameter is provided, it returns a single rate master characteristic. Otherwise, it returns all Rate Master characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Rate Applied
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
 *                     $ref: '#/components/schemas/AllRateAppliedModel'
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
rateAppliedRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "Rate Applied"), RateAppliedController.GetRateApplied);
/**
 * @swagger
 * /api/v1/rate_applied:
 *   post:
 *     tags: [Rate Applied]
 *     summary: Create Rate Applied
 *     description: Create a new Rate Applied.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AllRateAppliedModel'
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
rateAppliedRouter.post("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "Rate Applied"), RateAppliedController.CreateRateApplied);
/**
 * @swagger
 * /api/v1/rate_applied:
 *   put:
 *     tags: [Rate Applied]
 *     summary: Update Rate Applied
 *     description: Update a Rate Applied.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AllRateAppliedModel'
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
rateAppliedRouter.put("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Update", "Rate Applied"), RateAppliedController.UpdateRateApplied);
/**
 * @swagger
 * /api/v1/rate_applied/{id}:
 *   delete:
 *     tags: [Rate Applied]
 *     summary: Delete Rate Applied
 *     description: Delete a Rate Applied by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Rate Applied to delete
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
rateAppliedRouter.delete("/:id", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Delete", "Rate Applied"), RateAppliedController.DeleteRateApplied);
