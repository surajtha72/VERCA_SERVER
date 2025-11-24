import express from "express";
import * as CompositeSampleTestController from "../controllers/CompositeSampleTestController";
import { VerifyToken, VerifyUser } from "../Authorization";

const compositeSampleTestControllerRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Composite Sample
 *   description: Endpoints for Composite Sample
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllCompositeSampleTestModel:
 *       type: object
 *       required:
 *         - id
 *         - vehicleNo
 *         - productCategory
 *         - productName
 *         - routeId
 *         - testDate
 *         - temparature
 *         - fat
 *         - snf
 *         - acidity
 *         - mbrt
 *         - cob
 *         - adultrant
 *         - alcoholNo
 *         - phosphate
 *         - analyst
 *         - sampledBy
 *         - status
 *         - remarks
 *         - isActive
 *       properties:
 *         id:
 *           type: number
 *         vehicleNo:
 *           type: number
 *         productCategory:
 *           type: number
 *         productName:
 *           type: string
 *         routeId:
 *           type: number
 *         testDate:
 *           type: string
 *           format: date-time
 *         temparature:
 *           type: number
 *         fat:
 *           type: number
 *         snf:
 *           type: number
 *         acidity:
 *           type: number
 *         mbrt:
 *           type: number
 *         cob:
 *           type: string
 *         adultrant:
 *           type: string
 *         alcoholNo:
 *           type: string
 *         phosphate:
 *           type: string
 *         analyst:
 *           type: string
 *         sampledBy:
 *           type: string
 *         status:
 *           type: string
 *         remarks:
 *           type: string
 *         isActive:
 *           type: boolean
 */

/**
 * @swagger
 * /api/v1/composite_sample:
 *   get:
 *     tags: [Composite Sample]
 *     summary: Retrieve Composite Sample
 *     description: Retrieve all Composite Sample Characteristics. If `id` query parameter is provided, it returns a single Composite Sample characteristic. Otherwise, it returns all Composite Sample characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Composite Sample
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
 *                     $ref: '#/components/schemas/AllCompositeSampleTestModel'
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
compositeSampleTestControllerRouter.get("/", VerifyToken, VerifyUser("Read", "WeighBridge"), CompositeSampleTestController.GetCompositeSampleTest);

/**
 * @swagger
 * /api/v1/composite_sample:
 *   post:
 *     tags: [Composite Sample]
 *     summary: Create Composite Sample
 *     description: Create a new Composite Sample.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/AllCompositeSampleTestModel'
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
compositeSampleTestControllerRouter.post("/", VerifyToken, VerifyUser("Create", "WeighBridge"), CompositeSampleTestController.CreateCompositeSampleTest);

/**
 * @swagger
 * /api/v1/composite_sample:
 *   put:
 *     tags: [Composite Sample]
 *     summary: Update Composite Sample
 *     description: Update a Composite Sample.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AllCompositeSampleTestModel'
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
compositeSampleTestControllerRouter.put("/", VerifyToken, VerifyUser("Update", "WeighBridge"), CompositeSampleTestController.UpdateCompositeSampleTest);

/**
 * @swagger
 * /api/v1/composite_sample/{id}:
 *   delete:
 *     tags: [Composite Sample]
 *     summary: Delete Composite Sample
 *     description: Delete a Composite Sample by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Composite Sample to delete
 *         required: true
 *         schema:
 *           type: integer
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
compositeSampleTestControllerRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "WeighBridge"), CompositeSampleTestController.DeleteCompositeSampleTest);

export { compositeSampleTestControllerRouter };