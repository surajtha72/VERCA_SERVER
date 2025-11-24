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
exports.districtRouter = void 0;
const express = __importStar(require("express"));
const DistrictController = __importStar(require("../controllers/DistrictController"));
const Authorization_1 = require("../Authorization");
let districtRouter = express.Router();
exports.districtRouter = districtRouter;
/**
 * @swagger
 * tags:
 *   name: District
 *   description: Endpoints for District management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AllDistrictModel:
 *       type: object
 *       required:
 *         - id
 *         - stateId
 *         - name
 *       properties:
 *         id:
 *           type: number
 *         stateId:
 *           type: number
 *         name:
 *           type: string
 */
/**
 * @swagger
 * /api/v1/district:
 *   get:
 *     tags: [District]
 *     summary: Retrieve District
 *     description: Retrieve All District. If `id` query parameter is provided, it returns a single District. Otherwise, it returns all Districts.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the District
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
 *                     $ref: '#/components/schemas/AllDistrictModel'
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
districtRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "States"), DistrictController.GetAllDistricts);
/**
 * @swagger
 * /api/v1/district:
 *   post:
 *     summary: Create District
 *     description: This API endpoint allows to Create a new District.
 *     tags: [District]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stateId:
 *                   type: number
 *                   example: 1
 *                 name:
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
districtRouter.post("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "States"), DistrictController.CreateDistrict);
/**
 * @swagger
 * /api/v1/district:
 *   put:
 *     summary: Update a District
 *     description: This API endpoint allows to Update a district.
 *     tags: [District]
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
 *                 stateId:
 *                   type: number
 *                   example: 1
 *                 name:
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
districtRouter.put("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Update", "States"), DistrictController.UpdateDistrict);
/**
 * @swagger
 * /api/v1/district/{id}:
 *   delete:
 *     summary: Delete District
 *     description: This API endpoint deletes a District based on the provided ID.
 *     tags: [District]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the District to delete
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
districtRouter.delete("/:id", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Delete", "States"), DistrictController.DeleteDistrict);
