import * as express from "express";
import * as DashboardController from "../controllers/DashboardController";
import { VerifyToken, VerifyUser } from "../Authorization";
let dashboardRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard Milk Details
 *   description: Endpoints for Milk Collection Details management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllMilkCollectionDetailsModel:
 *       type: object
 *       required:
 *       properties:
 *         id:
 *           type: string
 *         milkCollectionId:
 *           type: string
 *         milkType:
 *           type: string
 *         operationType:
 *           type: string
 *         quantity:
 *           type: number
 *         fat:
 *           type: number
 *         snf:
 *           type: number
 *         weight:
 *           type: number
 *         canCount:
 *           type: number
 *         collectedFrom:
 *           type: number
 *         collectedAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         deletedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/get_milk_details_weight:
 *   get:
 *     tags: [Dashboard Milk Details]
 *     summary: Retrieve Milk Collection Details
 *     description: Retrieve All Milk Collection Details. If `id`, `milk collection id`, `milk type` or `operation type` query parameter is provided, it returns the particular filtered results. Otherwise, it returns all Milk Collections.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: ID of the Milk Collection Details
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
 *                     $ref: '#/components/schemas/AllMilkCollectionDetailsModel'
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
dashboardRouter.get(
  "/",
  VerifyToken,
  VerifyUser("Read", "MilkCollection"),
  DashboardController.GetOrganizationUnitWeights
);

dashboardRouter.get(
  "/bargraph_data",
  VerifyToken,
  VerifyUser("Read", "MilkCollection"),
  DashboardController.GetMorEveBargraphData
);

dashboardRouter.get(
  "/linegraph_data",
  VerifyToken,
  VerifyUser("Read", "MilkCollection"),
  DashboardController.GetLinneGraphData
);

export { dashboardRouter };
