import * as express from "express";
import * as TalukasController from "../controllers/TalukasController";
import { VerifyToken, VerifyUser } from "../Authorization";
let talukasRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Talukas
 *   description: Endpoints for Talukas management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllTalukasModel:
 *       type: object
 *       required:
 *         - id
 *         - districtId
 *         - stateId
 *         - name
 *         - pincode
 *       properties:
 *         id:
 *           type: number
 *         districtId:
 *           type: number
 *         stateId:
 *           type: number
 *         name:
 *           type: string
 *         pincode:
 *           type: string
 */


/**
 * @swagger
 * /api/v1/talukas:
 *   get:
 *     tags: [Talukas]
 *     summary: Retrieve Talukas
 *     description: Retrieve All Talukas. If `id` query parameter is provided, it returns a single Taluk. Otherwise, it returns all Talukas.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Taluk 
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
 *                     $ref: '#/components/schemas/AllTalukasModel'
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
talukasRouter.get("/", VerifyToken, VerifyUser("Read", "States"), TalukasController.GetAllTalukas);

/**
 * @swagger
 * /api/v1/talukas:
 *   post:
 *     summary: Create Taluk
 *     description: This API endpoint allows to Create a new Taluk.
 *     tags: [Talukas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 districtId:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "taluk"
 *                 pincode:
 *                   type: string
 *                   example: "pincode"
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
talukasRouter.post("/",VerifyToken, VerifyUser("Create", "States"), TalukasController.CreateTaluk);

/**
 * @swagger
 * /api/v1/talukas:
 *   put:
 *     summary: Update Taluk
 *     description: This API endpoint allows to Update Taluk.
 *     tags: [Talukas]
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
 *                 districtId:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "taluk"
 *                 pincode:
 *                   type: string
 *                   example: "pincode"
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
talukasRouter.put("/",VerifyToken, VerifyUser("Update", "States"), TalukasController.UpdateTaluk);

/**
 * @swagger
 * /api/v1/talukas/{id}:
 *   delete:
 *     summary: Delete Taluk
 *     description: This API endpoint deletes a Taluk based on the provided ID.
 *     tags: [Talukas]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Taluk to delete
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
talukasRouter.delete("/:id", VerifyUser("Delete", "States"), VerifyToken, TalukasController.DeleteTaluk);

export { talukasRouter }
