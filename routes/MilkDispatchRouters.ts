import * as express from "express";
import * as MilkDispatchController from "../controllers/MilkDispatchController";
import { VerifyToken, VerifyUser } from "../Authorization";
let milkDispatchRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Milk Dispatch
 *   description: Endpoints for Milk Dispatch management
 */

/**
 * @swagger
 * components:
 *   schemas:   
 *     AllMilkDispatchModel:
 *       type: object
 *       required:
 *       properties:
 *         id:
 *           type: string
 *         routeId:
 *           type: number
 *         transporterVehicleId:
 *           type: number
 *         startFat:
 *           type: number
 *         startSnf:
 *           type: number
 *         startClr:
 *           type: number
 *         endFat:
 *           type: number
 *         endSnf:
 *           type: number
 *         endClr:
 *           type: number
 *         weight:
 *           type: number
 *         dispatchedAt:
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
 * /api/v1/milk_dispatch:
 *   get:
 *     tags: [Milk Dispatch]
 *     summary: Retrieve Milk Dispatch Details
 *     description: Retrieve All Milk Dispatch Details. If `id` parameter is provided, it returns the particular filtered results. Otherwise, it returns all Milk Dispatch.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: ID of the Milk Dispatch
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
 *                     $ref: '#/components/schemas/AllMilkDispatchModel'
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
milkDispatchRouter.get("/", VerifyToken, VerifyUser("Read", "MilkCollection"), MilkDispatchController.GetAllMilkDispatch);

/**
 * @swagger
 * /api/v1/milk_dispatch/routes:
 *   get:
 *     summary: Get Milk Dispatch Routes
 *     description: This API endpoint allows to Get the Milk Dispatch Routes.
 *     tags: [Milk Dispatch]
 *     parameters:
 *       - in: query
 *         name: routeStopId
 *         schema:
 *           type: number
 *         description: ID of the Route Stop from the organization unit table 
 *         required: true
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
milkDispatchRouter.get("/routes",VerifyToken, VerifyUser("Read", "MilkCollection"), MilkDispatchController.GetMilkDipatchRoutes);

/**
 * @swagger
 * /api/v1/milk_dispatch:
 *   post:
 *     summary: Create Milk Dispatch
 *     description: This API endpoint allows to Create a new Milk Dispatch.
 *     tags: [Milk Dispatch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 routeId:
 *                   type: number
 *                 transporterVehicleId:
 *                   type: number
 *                 startFat:
 *                   type: number
 *                 startSnf:
 *                   type: number
 *                 startClr:
 *                   type: number
 *                 endFat:
 *                   type: number
 *                 endSnf:
 *                   type: number
 *                 endClr:
 *                   type: number
 *                 weight:
 *                   type: number
 *                 dispatchedAt:
 *                   type: string
 *                   format: date-time
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
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
milkDispatchRouter.post("/",VerifyToken, VerifyUser("Create", "MilkCollection"), MilkDispatchController.CreateMilkDispatch);

/**
 * @swagger
 * /api/v1/milk_dispatch:
 *   put:
 *     summary: Update Milk Dispatch
 *     description: This API endpoint allows to Update a new Milk Dispatch.
 *     tags: [Milk Dispatch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 routeId:
 *                   type: number
 *                 transporterVehicleId:
 *                   type: number
 *                 startFat:
 *                   type: number
 *                 startSnf:
 *                   type: number
 *                 startClr:
 *                   type: number
 *                 endFat:
 *                   type: number
 *                 endSnf:
 *                   type: number
 *                 endClr:
 *                   type: number
 *                 weight:
 *                   type: number
 *                 dispatchedAt:
 *                   type: string
 *                   format: date-time
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
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
milkDispatchRouter.put("/",VerifyToken, VerifyUser("Update", "MilkCollection"), MilkDispatchController.UpdateMilkDispatch);

/**
 * @swagger
 * /api/v1/milk_dispatch/{id}:
 *   delete:
 *     summary: Delete Milk Dispatch
 *     description: This API endpoint deletes a Milk Dispatch based on the provided ID.
 *     tags: [Milk Dispatch]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Milk Collection Detail to delete
 *         required: true
 *         schema:
 *           type: string
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
milkDispatchRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "MilkCollection"), MilkDispatchController.DeleteMilkDispatch);

export {milkDispatchRouter}