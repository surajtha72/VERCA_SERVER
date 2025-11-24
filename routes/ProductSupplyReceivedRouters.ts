// import express from "express";
// import * as ProductSupplyController from "../controllers/ProductSupplyController";
// import { VerifyToken, VerifyUser } from "../Authorization";

// const productSupplyRouterReceived = express.Router();

// /**
//  * @swagger
//  * tags:
//  *   name: Product Supply Received
//  *   description: Endpoints for Product Supply Received
//  */

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     AllProductSupplyModelReceived:
//  *       type: object
//  *       required:
//  *         - id
//  *         - indentRaisedBy
//  *         - indentRaisedFor
//  *         - indentRaisedOnDate
//  *         - indentProductId
//  *         - indentQuantity
//  *         - unitPrice
//  *         - indentApprovedBy
//  *         - approvedOnDate
//  *         - approvedQuantity
//  *         - paymentTerms
//  *         - purchaseIndentNo
//  *         - dispatchByEmployee
//  *         - dispatchQuantity
//  *         - dispatchDate
//  *         - receivedByUserId
//  *         - receivedOn
//  *         - receivedQuantity
//  *         - isActive
//  *       properties:
//  *         id:
//  *           type: number
//  *         indentRaisedBy:
//  *           type: number
//  *         indentRaisedFor: 
//  *           type: number
//  *         indentRaisedOnDate:
//  *           type: string
//  *           format: date-time
//  *         indentProductId:
//  *           type: number
//  *         indentQuantity:
//  *           type: number
//  *         unitPrice:
//  *           type: number
//  *         indentApprovedBy:
//  *           type: number
//  *         approvedOnDate:
//  *           type: string
//  *           format: date-time
//  *         approvedQuantity:
//  *           type: number
//  *         paymentTerms:
//  *           type: number
//  *         purchaseIndentNo:
//  *           type: number
//  *         dispatchByEmployee:
//  *           type: number
//  *         dispatchQuantity:
//  *           type: number
//  *         unitQtyIncentiveAmount:
//  *           type: number
//  *         dispatchDate:
//  *           type: string
//  *           format: date-time
//  *         receivedByUserId:
//  *           type: number
//  *         receivedOn:
//  *           type: string
//  *           format: date-time
//  *         receivedQuantity:
//  *           type: number
//  *         isActive:
//  *           type: boolean
//  */

// /**
//  * @swagger
//  * /api/v1/product_supply_received:
//  *   get:
//  *     tags: [Product Supply Received]
//  *     summary: Retrieve Product Supply
//  *     description: Retrieve all Product Supply Characteristics. If `id` query parameter is provided, it returns a single product supply characteristic. Otherwise, it returns all Product Supply characteristics.
//  *     parameters:
//  *       - in: query
//  *         name: id
//  *         schema:
//  *           type: integer
//  *         description: ID of the Product Supply
//  *     responses:
//  *       '200':
//  *         description: Successful response
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: number
//  *                   example: 200
//  *                 message:
//  *                   type: string
//  *                   example: "Success"
//  *                 data:
//  *                   type: array
//  *                   items:
//  *                     $ref: '#/components/schemas/AllProductSupplyModelReceived'
//  *       '500':
//  *         description: "Internal Server Error"
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: number
//  *                   example: 500
//  *                 message:
//  *                   type: string
//  *                   example: "Internal Server Error"
//  *                 data:
//  *                   type: object
//  *                   example: null
//  */
// productSupplyRouterReceived.get("/", VerifyToken, VerifyUser("Read", "Products"), ProductSupplyController.GetProductSupplyReceived);


// /**
//  * @swagger
//  * /api/v1/product_supply_received:
//  *   put:
//  *     tags: [Product Supply Received]
//  *     summary: Update Product Supply
//  *     description: Update a Product Supply.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/AllProductSupplyModelReceived'
//  *     responses:
//  *       '200':
//  *         description: Success
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: integer
//  *                   example: 200
//  *                 message:
//  *                   type: string
//  *                   example: "Updated Successfully"
//  *       '400':
//  *         description: Error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: integer
//  *                   example: 400
//  *                 message:
//  *                   type: string
//  *                   example: "Internal Server Error"
//  */
// productSupplyRouterReceived.put("/", VerifyToken, VerifyUser("Update", "Products"), ProductSupplyController.UpdateProductSupplyReceived);


// export { productSupplyRouterReceived };
