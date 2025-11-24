import * as express from "express";
import * as UserController from "../controllers/UserController";
import { VerifyToken, VerifyUser } from "../Authorization";
let manualEntryRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints for User management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllUsersModel:
 *       type: object
 *       required:
 *         - id
 *         - aadhaarNo
 *       properties:
 *         id:
 *           type: number
 *         aadhaarNo:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/manual_entry:
 *   post:
 *     summary: Check manual entry
 *     description: Check if manual entry is allowed for a user.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               aadhaarNo:
 *                 type: string
 *                 example: "123456789012"
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
 *                   example: "SUCCESS"
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
 *                   example: "Not allowed"
 */
manualEntryRouter.get("/", UserController.CheckManualEntry);

  
  export { manualEntryRouter };