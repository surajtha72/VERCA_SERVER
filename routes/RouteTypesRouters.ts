import * as express from "express";
import * as RouteTypesController from "../controllers/RouteTypesController";
import { VerifyToken, VerifyUser } from "../Authorization";
let routeTypesRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Route Types
 *   description: Endpoints for Routes management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllRouteTypesModel:
 *       type: object
 *       required:
 *         - id
 *         - shortDescription
 *         - fromProcUnitType
 *         - toProcOrgUnitType
 *         - vehicleType
 *       properties:
 *         id:
 *           type: number
 *         shortDescription:
 *           type: string
 *         fromProcUnitType: 
 *           type: number
 *         toProcOrgUnitType:
 *           type: number
 *         vehicleType:
 *           type: number
 */


/**
 * @swagger
 * /api/v1/routes/route_type:
 *   get:
 *     tags: [Route Types]
 *     summary: Retrieve Route Type
 *     description: Retrieve Route Type Characteristics. If `id` query parameter is provided, it returns a single route type characteristic. Otherwise, it returns all route type characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the route type 
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
 *                     $ref: '#/components/schemas/AllRouteTypesModel'
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
routeTypesRouter.get("/route_type", VerifyToken, VerifyUser("Read", "RouteMaster"), RouteTypesController.GetRouteTypes);

/**
 * @swagger
 * /api/v1/routes/route_type:
 *   post:
 *     summary: Create Route Type
 *     description: This API endpoint allows to Create a new Route Type.
 *     tags: [Route Types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortDescription:
 *                   type: string
 *                   example: "shortDescription"
 *                 fromProcUnitType:
 *                   type: number
 *                 toProcOrgUnitType:
 *                   type: number
 *                 vehicleType:
 *                   type: string
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
routeTypesRouter.post("/route_type",VerifyToken, VerifyUser("Create", "RouteMaster"), RouteTypesController.CreateRouteType);

/**
 * @swagger
 * /api/v1/routes/route_type:
 *   put:
 *     summary: Update Route Type
 *     description: This API endpoint allows to Update a Route Type.
 *     tags: [Route Types]
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
 *                 shortDescription:
 *                   type: string
 *                   example: "shortDescription"
 *                 fromProcUnitType:
 *                   type: number
 *                 toProcOrgUnitType:
 *                   type: number
 *                 vehicleType:
 *                   type: string
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
routeTypesRouter.put("/route_type",VerifyToken, VerifyUser("Update", "RouteMaster"), RouteTypesController.UpdateRouteType);

/**
 * @swagger
 * /api/v1/routes/route_type/{id}:
 *   delete:
 *     summary: Delete Route Type
 *     description: This API endpoint deletes a Route Type based on the provided ID.
 *     tags: [Route Types]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Route Type to delete
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
routeTypesRouter.delete("/route_type/:id", VerifyToken, VerifyUser("Delete", "RouteMaster"), RouteTypesController.DeleteRouteType);

export{routeTypesRouter}