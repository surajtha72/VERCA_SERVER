import * as express from "express";
import * as EntityController from "../controllers/EntityController";
import { VerifyToken } from "../Authorization";
let entityRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Entities
 *   description: Endpoints for entities management
 */

/**
 * @swagger
 * /api/v1/entities:
 *   get:
 *     tags: [Entities]
 *     summary: Retrieve Entities Types
 *     description: Retrieve all Entities Types.
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
entityRouter.get("/", VerifyToken, EntityController.GetAllEntities);

export {entityRouter}