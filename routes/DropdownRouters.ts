import * as express from "express";
import * as DropdownController from "../controllers/DropdownController";
import { VerifyToken } from "../Authorization";
let dropdownRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dropdown
 *   description: Endpoints for Dropdown management
 */

/**
 * @swagger
 * /api/v1/dropdown/payroll_types:
 *   get:
 *     tags: [Dropdown]
 *     summary: Retrieve Payroll Types
 *     description: Retrieve all Payroll Types.
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
dropdownRouter.get("/payroll_types", VerifyToken, DropdownController.GetPayrollTypes);

/**
 * @swagger
 * /api/v1/dropdown/default_collection_type:
 *   get:
 *     tags: [Dropdown]
 *     summary: Retrieve Default Collection Types
 *     description: Retrieve all Default Collection Types.
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
dropdownRouter.get("/default_collection_type", VerifyToken, DropdownController.GetDefaultCollectionType);

/**
 * @swagger
 * /api/v1/dropdown/organization_unit_types:
 *   get:
 *     tags: [Dropdown]
 *     summary: Retrieve Organization Unit Types
 *     description: Retrieve all Organization Unit Types.
 *     parameters:
 *       - in: query
 *         name: isProcurementCenter
 *         schema:
 *           type: boolean
 *         description: Flag indicating whether the organization unit is a procurement center.
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
dropdownRouter.get("/organization_unit_types", VerifyToken, DropdownController.GetOrganizationUnitTypes);

/**
 * @swagger
 * /api/v1/dropdown/shifts_applicable:
 *   get:
 *     tags: [Dropdown]
 *     summary: Retrieve Shifts Table
 *     description: Retrieve all shifts table datas.
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
dropdownRouter.get("/shifts_applicable", VerifyToken, DropdownController.GetShifts);

export { dropdownRouter };