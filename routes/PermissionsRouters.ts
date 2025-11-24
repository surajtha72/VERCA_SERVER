import * as express from "express";
import * as PermissionsController from "../controllers/PermissionsController";
import { VerifyToken } from "../Authorization";
let permissionsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: Endpoints for entities management
 */

/**
 * @swagger
 * /api/v1/permissions:
 *   get:
 *     tags: [Permissions]
 *     summary: Retrieve All Permissions 
 *     description: Retrieve all Permissions.
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
 *         description: Internal Server Error
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
permissionsRouter.get("/", VerifyToken, PermissionsController.GetAllPermissions);

export {permissionsRouter}