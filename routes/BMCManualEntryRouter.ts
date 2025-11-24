import * as express from "express";
import * as ManualEntryController from "../controllers/ManualEntryController";
import { VerifyToken, VerifyUser } from "../Authorization";
let bmcManualEntryRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Manual Entry
 *   description: Endpoints for Manual Entry management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllowManualEntryModel:
 *       type: object
 */


/**
 * @swagger
 * /api/v1/bmc_manual_entry:
 *   get:
 *     tags: [Manual Entry]
 *     summary: Retrieves Manual Entries
 *     parameters:
 *       - in: query
 *         name: organizationUnit
 *         schema:
 *           type: integer
 *         description: ID of the Organization Unit 
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
 *                     $ref: '#/components/schemas/AllowManualEntryModel'
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
bmcManualEntryRouter.get("/", VerifyToken, VerifyUser("Read", "States"), ManualEntryController.GetManualEntry);

/**
 * @swagger
 * /api/v1/bmc_manual_entry:
 *   post:
 *     summary: Create State
 *     description: This API endpoint allows to Create a new Manual Entry Request.
 *     tags: [Manual Entry]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 organizationUnit:
 *                   type: number
 *                   example: 2
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
 *                   example: "Created Successfully"
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
bmcManualEntryRouter.post("/",VerifyToken, VerifyUser("Create", "States"), ManualEntryController.CreateManualEntry);

/**
 * @swagger
 * /api/v1/bmc_manual_entry:
 *   put:
 *     summary: Update a Manual Entry
 *     description: This API endpoint allows to Update a new State.
 *     tags: [Manual Entry]
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
 *                   example: "stateName"
 *                 stateCode:
 *                   type: string
 *                   example: "stateName"
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
bmcManualEntryRouter.put("/",VerifyToken, VerifyUser("Update", "States"), ManualEntryController.UpdateManualEntry);

/**
 * @swagger
 * /api/v1/bmc_manual_entry/{id}:
 *   delete:
 *     summary: Delete Manual Entry
 *     description: This API endpoint deletes a State based on the provided ID.
 *     tags: [Manual Entry]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the State to delete
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
bmcManualEntryRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "States"), ManualEntryController.DeleteManualEntry);

export{bmcManualEntryRouter}