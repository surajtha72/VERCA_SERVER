import * as express from "express";
import * as VehicleController from "../controllers/VehicleController";
import { VerifyToken, VerifyUser } from "../Authorization";
let vehiclesRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Vehicles
 *   description: Endpoints for Vehicles management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllVehiclesModel:
 *       type: object
 *       required:
 *         - id
 *         - transporterId
 *         - isisFoodTransportVehicle
 *         - vehicleType
 *         - registrationNumber
 *         - make 
 *         - model
 *         - capacity
 *         - FSSAILicNo
 *         - FSSAILicExpiryDate
 *         - insurance
 *         - insuranceExpiryDate
 *         - isActive
 *       properties:
 *         id:
 *           type: number
 *         transporterId:
 *           type: number
 *         isisFoodTransportVehicle: 
 *           type: boolean
 *         vehicleType:
 *           type: string
 *         registrationNumber:
 *           type: string
 *         make: 
 *           type: string
 *         capacity:
 *           type: integer
 *           format: int64
 *         FSSAILicNo: 
 *           type: string
 *         FSSAILicExpiryDate:
 *           type: string
 *         insurance: 
 *           type: string
 *         insuranceExpiryDate:
 *           type: string
 *         isActive: 
 *           type: boolean
 */


/**
 * @swagger
 * /api/v1/transporters/vehicles:
 *   get:
 *     tags: [Vehicles]
 *     summary: Retrieve Vehicles
 *     description: Retrieve Vehicles Characteristics. If `id` query parameter is provided, it returns a single vehicle characteristic. Otherwise, it returns all vehicles characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the vehicle
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
 *                     $ref: '#/components/schemas/AllVehicleModel'
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
vehiclesRouter.get("/", VerifyToken, VerifyUser("Read", "Vehicles"), VehicleController.GetAllVehicles);

/**
 * @swagger
 * /api/v1/transporters/vehicles:
 *   post:
 *     summary: Create Vehicle
 *     description: This API endpoint allows to Create New Vehicles
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 transporterId:
 *                   type: integer
 *                   example: 1
 *                 isisFoodTransportVehicle:
 *                   type: boolean
 *                 vehicleType:
 *                   type: string
 *                 registrationNumber:
 *                   type: string
 *                 make:
 *                   type: string
 *                 model:
 *                   type: string
 *                 capacity:
 *                   type: integer
 *                   format: int64
 *                   example: 10000
 *                 FSSAILicNo:
 *                   type: string
 *                   example: 1
 *                 FSSAILicExpiryDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-07-31T12:00:00Z"
 *                 insurance:
 *                   type: string
 *                 insuranceExpiryDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-07-31T12:00:00Z"
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
vehiclesRouter.post("/", VerifyToken, VerifyUser("Create", "Vehicles"), VehicleController.CreateVehicle);

/**
 * @swagger
 * /api/v1/transporters/vehicles:
 *   put:
 *     summary: Update a Vehicle
 *     description: This API endpoint allows to Update a new Vehicle.
 *     tags: [Vehicles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 transporterId:
 *                   type: integer
 *                   example: 1
 *                 isisFoodTransportVehicle:
 *                   type: boolean
 *                 vehicleType:
 *                   type: string
 *                 registrationNumber:
 *                   type: string
 *                 make:
 *                   type: string
 *                 model:
 *                   type: string
 *                 capacity:
 *                   type: integer
 *                   format: int64
 *                   example: 10000
 *                 FSSAILicNo:
 *                   type: string
 *                   example: 1
 *                 FSSAILicExpiryDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-07-31T12:00:00Z"
 *                 insurance:
 *                   type: string
 *                 insuranceExpiryDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-07-31T12:00:00Z"
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
vehiclesRouter.put("/", VerifyToken, VerifyUser("Update", "Vehicles"), VehicleController.UpdateVehicle);

/**
 * @swagger
 * /api/v1/transporters/vehicles/{id}:
 *   delete:
 *     summary: Delete Role
 *     description: This API endpoint deletes a Vehicle based on the provided ID.
 *     tags: [Vehicles]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Vehicle to delete
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
vehiclesRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "Vehicles"), VehicleController.DeleteVehicle);

export { vehiclesRouter };
