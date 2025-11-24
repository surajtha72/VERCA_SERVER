import * as express from "express";
import * as RouteStopsController from "../controllers/RouteStopsController";
import { VerifyToken, VerifyUser } from "../Authorization";
let routeStopsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Route Stops
 *   description: Endpoints for Route Stops management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllRouteStopsModel:
 *       type: object
 *       required:
 *         - id
 *         - routeId
 *         - sequenceNo
 *         - stopId
 *         - travelKms
 *       properties:
 *         id:
 *           type: number
 *         routeId:
 *           type: number
 *         sequenceNo: 
 *           type: number
 *         stopId:
 *           type: number
 *         travelKms:
 *           type: number
 */

/**
 * @swagger
 * /api/v1/route_stops:
 *   get:
 *     tags: [Route Stops]
 *     summary: Retrieve Route Stops
 *     description: Retrieve Route Stops Characteristics. If `id` query parameter is provided, it returns a single Route Stops characteristic. Otherwise, it returns all Route Stops characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the route stop
 *       - in: query
 *         name: routeMasterId
 *         schema:
 *           type: integer
 *         description: ID of the route master
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
 *                     $ref: '#/components/schemas/AllRouteStopsModel'
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
routeStopsRouter.get("/", VerifyToken, VerifyUser("Read", "RouteStop"), RouteStopsController.GetRouteStops);

/**
 * @swagger
 * /api/v1/route_stops:
 *   post:
 *     summary: Create Route Stops
 *     description: This API endpoint allows to Create a new Route Stops.
 *     tags: [Route Stops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 routeId:
 *                   type: number
 *                   example: 1
 *                 sequenceNo:
 *                   type: number
 *                   example: 1
 *                 stopId:
 *                   type: number
 *                   example: 1
 *                 travelKms:
 *                   type: number
 *                   example: 1.5
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
routeStopsRouter.post("/",VerifyToken, VerifyUser("Create", "RouteStop"), RouteStopsController.CreateRouteStop);

/**
 * @swagger
 * /api/v1/route_stops:
 *   put:
 *     summary: Update Route Stops
 *     description: This API endpoint allows to Update a new Route Stops.
 *     tags: [Route Stops]
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
 *                 routeId:
 *                   type: number
 *                   example: 1
 *                 sequenceNo:
 *                   type: number
 *                   example: 1
 *                 stopId:
 *                   type: number
 *                   example: 1
 *                 travelKms:
 *                   type: number
 *                   example: 1.5
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
routeStopsRouter.put("/",VerifyToken, VerifyUser("Update", "RouteStop"), RouteStopsController.UpdateRouteStop);

/**
 * @swagger
 * /api/v1/route_stops/{id}:
 *   delete:
 *     summary: Delete Route Stop
 *     description: This API endpoint deletes a Route Stop based on the provided ID.
 *     tags: [Route Stops]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Route Stop to delete
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
routeStopsRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "RouteStop"), RouteStopsController.DeleteRouteStop);

export{routeStopsRouter}