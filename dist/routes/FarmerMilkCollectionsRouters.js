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
exports.farmerMilkCollectionsRouter = void 0;
const express = __importStar(require("express"));
const FarmerMilkCollectionsController = __importStar(require("../controllers/FarmerMilkCollectionsController"));
const Authorization_1 = require("../Authorization");
let farmerMilkCollectionsRouter = express.Router();
exports.farmerMilkCollectionsRouter = farmerMilkCollectionsRouter;
/**
 * @swagger
 * tags:
 *   name: Farmer Milk Collections
 *   description: Endpoints for Farmer Milk Collections management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AllFarmerMilkCollectionsModel:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - shift
 *         - status
 *         - collectionDateTime
 *         - startedAt
 *         - completedAt
 *         - createdAt
 *         - updatedAt
 *         - deletedAt
 *         - createdBy
 *         - updatedBy
 *         - deletedBy
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         shift:
 *           type: string
 *         status:
 *           type: string
 *         collectionDateTime:
 *           type: string
 *           format: date-time
 *         startedAt:
 *           type: string
 *           format: date-time
 *         completedAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         createdBy:
 *           type: number
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         updatedBy:
 *           type: number
 *         deletedAt:
 *           type: string
 *           format: date-time
 *         deletedBy:
 *           type: number
 */
/**
 * @swagger
 * /api/v1/farmer_milk_collections:
 *   get:
 *     tags: [Farmer Milk Collections]
 *     summary: Retrieve Farmer Milk Collections
 *     description: Retrieve All Farmer Milk Collections. If `id`, `shift` or `status` query parameter is provided, it returns the particular filtered results. Otherwise, it returns all Farmer Milk Collections.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: ID of the Farmer Milk Collections
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Status of the Farmer Milk Collections
 *       - in: query
 *         name: shift
 *         schema:
 *           type: string
 *         description: Shift of the Farmer Milk Collections
 *       - in: query
 *         name: organizationUnitId
 *         schema:
 *           type: number
 *         description: filter for a perticular organization unit id
 *       - in: query
 *         name: filterDate
 *         schema:
 *           type: date
 *         description: filter for a perticular organization unit id
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
 *                     $ref: '#/components/schemas/AllFarmerMilkCollectionsModel'
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
farmerMilkCollectionsRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "MilkCollection"), FarmerMilkCollectionsController.GetAllFarmerMilkCollections);
farmerMilkCollectionsRouter.get("/portal", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "MilkCollection"), FarmerMilkCollectionsController.GetFarmerMilkCollectionsPortal);
farmerMilkCollectionsRouter.get("/unlocked_billing_cycles", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "MilkCollection"), FarmerMilkCollectionsController.GetUnlockedBillingCycles);
/**
 * @swagger
 * /api/v1/farmer_milk_collections/routes:
 *   get:
 *     summary: Get Milk Collection Routes
 *     description: This API endpoint allows to Get the Milk Collection Routes.
 *     tags: [Farmer Milk Collections]
 *     parameters:
 *       - in: query
 *         name: routeOwnerId
 *         schema:
 *           type: number
 *         description: ID of the Route owner from the organization unit table
 *         required: true
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
farmerMilkCollectionsRouter.get("/routes", Authorization_1.VerifyToken, FarmerMilkCollectionsController.GeFarmerMilkRoutes);
/**
 * @swagger
 * /api/v1/farmer_milk_collections:
 *   post:
 *     summary: Create Milk Collection
 *     description: This API endpoint allows to Create a new Milk Collection.
 *     tags: [Farmer Milk Collections]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "b1aa0719-d001-43c2-9864-e18c118be879"
 *                 name:
 *                   type: string
 *                   example: "milk collection 1"
 *                 shift:
 *                   type: string
 *                   example: "shift"
 *                 status:
 *                   type: string
 *                   example: "status"
 *                 collectionDateTime:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 startedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 completedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 createdBy:
 *                   type: number
 *                   example: 1
 *                 updatedBy:
 *                   type: number
 *                   example: 1
 *                 deletedBy:
 *                   type: number
 *                   example: 1
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
farmerMilkCollectionsRouter.post("/", Authorization_1.VerifyToken, FarmerMilkCollectionsController.CreateFarmerMilkCollection);
/**
 * @swagger
 * /api/v1/farmer_milk_collections:
 *   put:
 *     summary: Update Farmer Milk Collection
 *     description: This API endpoint allows to Update a Farmer Milk Collection.
 *     tags: [Farmer Milk Collections]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "b1aa0719-d001-43c2-9864-e18c118be879"
 *                 name:
 *                   type: string
 *                   example: "milk collection 1"
 *                 shift:
 *                   type: string
 *                   example: "shift"
 *                 status:
 *                   type: string
 *                   example: "status"
 *                 collectionDateTime:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 startedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 completedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 createdBy:
 *                   type: number
 *                   example: 1
 *                 updatedBy:
 *                   type: number
 *                   example: 1
 *                 deletedBy:
 *                   type: number
 *                   example: 1
 *                 fat:
 *                   type: number
 *                   example: 1
 *                 clr:
 *                   type: number
 *                   example: 1
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
farmerMilkCollectionsRouter.put("/", Authorization_1.VerifyToken, FarmerMilkCollectionsController.UpdateFarmerMilkCollection);
farmerMilkCollectionsRouter.put("/lock_milk_bill", Authorization_1.VerifyToken, FarmerMilkCollectionsController.LockMilkBill);
/**
 * @swagger
 * /api/v1/farmer_milk_collections/{id}:
 *   delete:
 *     summary: Delete Farmer Milk Collection
 *     description: This API endpoint deletes a Farmer Milk Collection based on the provided ID.
 *     tags: [Farmer Milk Collections]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Farmer Milk Collection to delete
 *         required: true
 *         schema:
 *           type: string
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
farmerMilkCollectionsRouter.delete("/:id", Authorization_1.VerifyToken, FarmerMilkCollectionsController.DeleteFarmerMilkCollection);
