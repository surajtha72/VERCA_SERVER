import * as express from "express";
import * as OrganizationsController from "../controllers/OrganizationsController";
import { VerifyToken, VerifyUser } from "../Authorization";
let nonPaginationRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: All Organizations
 *   description: Endpoints for Organizations management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllOrganizationsModel:
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
 *     AllFinancialYearModel:
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
 * /api/v1/all_organizations/?allAgents:
 *   get:
 *     tags: [All Agents]
 *     summary: Retrieve Organizations
 *     description: Retrieve all Organizations Center Characteristics. If `id` query parameter is provided, it returns a single Organization characteristic. Otherwise, it returns all Organizations.
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
 *                     $ref: '#/components/schemas/AllOrganizationsModel'
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
nonPaginationRouter.get(
  "/?allAgents",
  VerifyToken,
  VerifyUser("Read", "Organization"),
  OrganizationsController.GetAllOrganizations
);

export { nonPaginationRouter }