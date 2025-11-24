import * as express from "express";
import * as RoleHasPermissionsController from "../controllers/RoleHasPermissionsController";
import { VerifyToken } from "../Authorization";
let roleHasPermissionsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Role Has Permissions
 *   description: Endpoints for Role Has Permissions management
 */

/**
 * @swagger
 * /api/v1/role_has_permissions:
 *   get:
 *     tags: [Role Has Permissions]
 *     summary: Retrieve All Role Has Permissions 
 *     description: Retrieve all Role Has Permissions.
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
roleHasPermissionsRouter.get("/", VerifyToken, RoleHasPermissionsController.GetAllRoleHasPermissions);

export {roleHasPermissionsRouter}