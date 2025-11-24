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
exports.talukasRouter = void 0;
const express = __importStar(require("express"));
const TalukasController = __importStar(require("../controllers/TalukasController"));
const Authorization_1 = require("../Authorization");
let talukasRouter = express.Router();
exports.talukasRouter = talukasRouter;
/**
 * @swagger
 * tags:
 *   name: Talukas
 *   description: Endpoints for Talukas management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AllTalukasModel:
 *       type: object
 *       required:
 *         - id
 *         - districtId
 *         - stateId
 *         - name
 *         - pincode
 *       properties:
 *         id:
 *           type: number
 *         districtId:
 *           type: number
 *         stateId:
 *           type: number
 *         name:
 *           type: string
 *         pincode:
 *           type: string
 */
/**
 * @swagger
 * /api/v1/talukas:
 *   get:
 *     tags: [Talukas]
 *     summary: Retrieve Talukas
 *     description: Retrieve All Talukas. If `id` query parameter is provided, it returns a single Taluk. Otherwise, it returns all Talukas.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Taluk
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
 *                     $ref: '#/components/schemas/AllTalukasModel'
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
talukasRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "States"), TalukasController.GetAllTalukas);
/**
 * @swagger
 * /api/v1/talukas:
 *   post:
 *     summary: Create Taluk
 *     description: This API endpoint allows to Create a new Taluk.
 *     tags: [Talukas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 districtId:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "taluk"
 *                 pincode:
 *                   type: string
 *                   example: "pincode"
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
talukasRouter.post("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "States"), TalukasController.CreateTaluk);
/**
 * @swagger
 * /api/v1/talukas:
 *   put:
 *     summary: Update Taluk
 *     description: This API endpoint allows to Update Taluk.
 *     tags: [Talukas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 districtId:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "taluk"
 *                 pincode:
 *                   type: string
 *                   example: "pincode"
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
talukasRouter.put("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Update", "States"), TalukasController.UpdateTaluk);
/**
 * @swagger
 * /api/v1/talukas/{id}:
 *   delete:
 *     summary: Delete Taluk
 *     description: This API endpoint deletes a Taluk based on the provided ID.
 *     tags: [Talukas]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Taluk to delete
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
talukasRouter.delete("/:id", (0, Authorization_1.VerifyUser)("Delete", "States"), Authorization_1.VerifyToken, TalukasController.DeleteTaluk);
