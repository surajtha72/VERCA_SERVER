import express from "express";
import * as RateAppliedController from "../controllers/RateAppliedController";
import { VerifyToken, VerifyUser } from "../Authorization";

const rateAppliedRouter = express.Router();

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
rateAppliedRouter.get("/", VerifyToken, VerifyUser("Read", "Rate Applied"), RateAppliedController.GetRateApplied);

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
rateAppliedRouter.post("/", VerifyToken, VerifyUser("Create", "Rate Applied"), RateAppliedController.CreateRateApplied);

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
rateAppliedRouter.put("/", VerifyToken, VerifyUser("Update", "Rate Applied"), RateAppliedController.UpdateRateApplied);

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
rateAppliedRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "Rate Applied"), RateAppliedController.DeleteRateApplied);

export { rateAppliedRouter };
