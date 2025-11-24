import * as express from "express";
import * as FarmersController from "../controllers/FarmerController";
import { VerifyToken, VerifyUser } from "../Authorization";
let farmerRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Farmers
 *   description: Endpoints for Farmers management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllFarmersModel:
 *       type: object
 *       required:
 *         - pageIndex
 *         - totalPages
 *         - totalRecords
 *         - data
 *       properties:
 *         pageIndex:
 *           type: integer
 *         totalPages:
 *           type: integer
 *         totalRecords:
 *           type: integer
 *         data:
 *           type: array
 *           example: []
 */


/**
 * @swagger
 * /api/v1/farmers:
 *   get:
 *     tags: [Farmers]
 *     summary: Retrieve Farmers
 *     description: Retrieve all Farmer.
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
 *                     $ref: '#/components/schemas/AllFarmersModel'
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
farmerRouter.get(
  "/",
  VerifyToken,
  FarmersController.GetAllFarmers
);

/**
 * @swagger
 * /api/v1/farmers:
 *   post:
 *     summary: Create Farmers
 *     description: This API endpoint allows to Create a new Farmers.
 *     tags: [Farmers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 parentId:
 *                   type: number
 *                   example: 1
 *                 addressLine1:
 *                   type: string
 *                   example: "address1"
 *                 addressLine2:
 *                   type: string
 *                   example: "address2"
 *                 stateId:
 *                   type: number
 *                   example: 1
 *                 districtId:
 *                   type: number
 *                   example: 1
 *                 vctId:
 *                   type: number
 *                   example: 1
 *                 geocode:
 *                   type: string
 *                   example: "geocode"
 *                 bankDetailsId:
 *                   type: number
 *                   example: "bankDetailsId"
 *                 accountNumber:
 *                   type: string
 *                   example: "accountNumber"
 *                 phoneNumber:
 *                   type: string
 *                   example: "phoneNumber"
 *                 ifscCode:
 *                   type: string
 *                   example: "ifscCode"
 *                 payrollType:
 *                   type: number
 *                   example: 1
 *                 routeType:
 *                   type: number
 *                   example: "routeType"
 *                 headload:
 *                   type: number
 *                   example: 1
 *                 commission:
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
farmerRouter.post("/",VerifyToken, FarmersController.CreateFarmers);

/**
 * @swagger
 * /api/v1/farmers:
 *   put:
 *     summary: Update Farmers
 *     description: This API endpoint allows to Update an Farmers.
 *     tags: [Farmers]
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
 *                 parentId:
 *                   type: number
 *                   example: 1
 *                 addressLine1:
 *                   type: string
 *                   example: "address1"
 *                 addressLine2:
 *                   type: string
 *                   example: "address2"
 *                 stateId:
 *                   type: number
 *                   example: 1
 *                 districtId:
 *                   type: number
 *                   example: 1
 *                 vctId:
 *                   type: number
 *                   example: 1
 *                 geocode:
 *                   type: string
 *                   example: "geocode"
 *                 bankDetailsId:
 *                   type: number
 *                   example: "bankDetailsId"
 *                 accountNumber:
 *                   type: string
 *                   example: "accountNumber"
 *                 phoneNumber:
 *                   type: string
 *                   example: "phoneNumber"
 *                 ifscCode:
 *                   type: string
 *                   example: "ifscCode"
 *                 payrollType:
 *                   type: number
 *                   example: 1
 *                 routeType:
 *                   type: number
 *                   example: "routeType"
 *                 headload:
 *                   type: number
 *                   example: 1
 *                 commission:
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
farmerRouter.put("/",VerifyToken, FarmersController.UpdateFarmers);

/**
 * @swagger
 * /api/v1/farmers/{id}:
 *   delete:
 *     summary: Delete Farmers
 *     description: This API endpoint deletes a Farmer based on the provided ID.
 *     tags: [Farmers]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Farmer to delete
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
farmerRouter.delete("/:id", VerifyToken, FarmersController.DeleteFarmers);


export { farmerRouter }