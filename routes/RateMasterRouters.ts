import * as express from "express";
import * as RateMasterController from "../controllers/RateMasterController";
import { VerifyToken, VerifyUser } from "../Authorization";
let rateMasterRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Rate Master
 *   description: Endpoints for Transporters management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllRateMasterModel:
 *       type: object
 *       required:
 *         - id
 *         - effectiveFrom
 *         - cowFatRate
 *         - cowSnfRate
 *         - buffFatRate
 *         - buffSnfRate
 *         - shiftsApplicable
 *       properties:
 *         id:
 *           type: number
 *         effectiveFrom:
 *           type: string
 *           format: date-time
 *         cowFatRate: 
 *           type: number
 *         cowSnfRate:
 *           type: number
 *         buffFatRate:
 *           type: number
 *         buffSnfRate:
 *           type: number
 *         shiftsApplicable:
 *           type: number
 */


/**
 * @swagger
 * /api/v1/rate_master:
 *   get:
 *     tags: [Rate Master]
 *     summary: Retrieve Rate Master
 *     description: Retrieve all Rate Master Characteristics. If `id` query parameter is provided, it returns a single rate master characteristic. Otherwise, it returns all Rate Master characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Rate Master 
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
 *                     $ref: '#/components/schemas/AllRateMasterModel'
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
rateMasterRouter.get("/", VerifyToken, VerifyUser("Read", "RateMaster"), RateMasterController.GetRateMaster);

/**
 * @swagger
 * /api/v1/rate_master:
 *   post:
 *     summary: Create Rate Master
 *     description: This API endpoint allows to Create a new Rate Master.
 *     tags: [Rate Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 effectiveFrom:
 *                   type: string
 *                   format: date-time
 *                 cowFatRate:
 *                   type: number
 *                   example: 2
 *                 cowSnfRate:
 *                   type: number
 *                   example: 4
 *                 buffFatRate:
 *                   type: number
 *                   example: 3
 *                 buffSnfRate:
 *                   type: number
 *                   example: 2
 *                 shiftsApplicable:
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
rateMasterRouter.post("/",VerifyToken, VerifyUser("Create", "RateMaster"), RateMasterController.CreateRateMaster);

/**
 * @swagger
 * /api/v1/rate_master:
 *   put:
 *     summary: Update Rate Master
 *     description: This API endpoint allows to Update a Rate Master.
 *     tags: [Rate Master]
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
 *                 effectiveFrom:
 *                   type: string
 *                   format: date-time
 *                 cowFatRate:
 *                   type: number
 *                   example: 2
 *                 cowSnfRate:
 *                   type: number
 *                   example: 4
 *                 buffFatRate:
 *                   type: number
 *                   example: 3
 *                 buffSnfRate:
 *                   type: number
 *                   example: 2
 *                 shiftsApplicable:
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
rateMasterRouter.put("/",VerifyToken, VerifyUser("Update", "RateMaster"), RateMasterController.UpdateRateMaster);

/**
 * @swagger
 * /api/v1/rate_master/{id}:
 *   delete:
 *     summary: Delete Rate Master
 *     description: This API endpoint deletes a Rate Master on the provided ID.
 *     tags: [Rate Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Rate Master to delete
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
rateMasterRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "RateMaster"), RateMasterController.DeleteRateMaster);

export { rateMasterRouter }