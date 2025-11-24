import * as express from "express";
import * as TransportersController from "../controllers/TransportersController";
import { VerifyToken, VerifyUser } from "../Authorization";
let transportersRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Transporters
 *   description: Endpoints for Transporters management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllTransportersModel:
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
 * /api/v1/transporters:
 *   get:
 *     tags: [Transporters]
 *     summary: Retrieve Transporters
 *     description: Retrieve all Transporters Center Characteristics. If `id` query parameter is provided, it returns a single procurement center characteristic. Otherwise, it returns all Transporters characteristics.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Transporters
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
 *                     $ref: '#/components/schemas/AllTransportersModel'
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
transportersRouter.get(
    "/",
    VerifyToken,
    VerifyUser("Read", "Transporters"),
    TransportersController.GetTransporters
);

/**
 * @swagger
 * /api/v1/transporters:
 *   post:
 *     summary: Create Transporters
 *     description: This API endpoint allows to Create a new Transporter.
 *     tags: [Transporters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firmName:
 *                   type: string
 *                   example: "firmname"
 *                 code:
 *                   type: string
 *                   example: "code"
 *                 contactPersonName:
 *                   type: string
 *                   example: "name"
 *                 mobileNo:
 *                   type: string
 *                   example: "mobile"
 *                 emailId:
 *                   type: string
 *                   example: "email"
 *                 addressLine1:
 *                   type: string
 *                   example: "address"
 *                 addressLine2:
 *                   type: string
 *                   example: "address2"
 *                 state:
 *                   type: number
 *                   example: 1
 *                 district:
 *                   type: number
 *                   example: 2
 *                 vtc:
 *                   type: number
 *                   example: 2
 *                 pincode:
 *                   type: string
 *                   example: "pin"
 *                 geocode:
 *                   type: string
 *                   example: "geocode"
 *                 aadhaarNo:
 *                   type: string
 *                   example: "aadhaar"
 *                 panNo:
 *                   type: string
 *                   example: "pan"
 *                 bankAcNo:
 *                   type: string
 *                   example: "number"
 *                 bankAcName:
 *                   type: string
 *                   example: "bank account name"
 *                 bankIfscCode:
 *                   type: string
 *                   example: "ifsc"
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
transportersRouter.post("/", VerifyToken, VerifyUser("Create", "Transporters"), TransportersController.CreateTransporters);

/**
 * @swagger
 * /api/v1/transporters:
 *   put:
 *     summary: Update Transporters
 *     description: This API endpoint allows to update a Transporter.
 *     tags: [Transporters]
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
 *                 firmName:
 *                   type: string
 *                   example: "firmname"
 *                 code:
 *                   type: string
 *                   example: "code"
 *                 contactPersonName:
 *                   type: string
 *                   example: "name"
 *                 mobileNo:
 *                   type: string
 *                   example: "mobile"
 *                 emailId:
 *                   type: string
 *                   example: "email"
 *                 addressLine1:
 *                   type: string
 *                   example: "address"
 *                 addressLine2:
 *                   type: string
 *                   example: "address2"
 *                 state:
 *                   type: number
 *                   example: 1
 *                 district:
 *                   type: number
 *                   example: 2
 *                 vtc:
 *                   type: number
 *                   example: 2
 *                 pincode:
 *                   type: string
 *                   example: "pin"
 *                 geocode:
 *                   type: string
 *                   example: "geocode"
 *                 aadhaarNo:
 *                   type: string
 *                   example: "aadhaar"
 *                 panNo:
 *                   type: string
 *                   example: "pan"
 *                 bankAcNo:
 *                   type: string
 *                   example: "number"
 *                 bankAcName:
 *                   type: string
 *                   example: "bank account name"
 *                 bankIfscCode:
 *                   type: string
 *                   example: "ifsc"
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
transportersRouter.put("/", VerifyToken, VerifyUser("Update", "Transporters"), TransportersController.UpdateTransporters);

/**
 * @swagger
 * /api/v1/transporters/{id}:
 *   delete:
 *     summary: Delete Transporters
 *     description: This API endpoint deletes a Transporters based on the provided ID.
 *     tags: [Transporters]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Transporters to delete
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
transportersRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "Transporters"), TransportersController.DeleteTransporters);

export { transportersRouter }