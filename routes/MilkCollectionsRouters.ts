import * as express from "express";
import * as MilkCollectionsController from "../controllers/MilkCollectionsController";
import { VerifyToken, VerifyUser } from "../Authorization";
let milkCollectionsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Milk Collections
 *   description: Endpoints for Milk Collections management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllMilkCollectionsModel:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - shift
 *         - status
 *         - collectionDateTime
 *         - startedAt
 *         - completedAt
 *         - createdAt
 *         - updatedAt
 *         - deletedAt
 *         - createdBy
 *         - updatedBy
 *         - deletedBy
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         shift:
 *           type: string
 *         status:
 *           type: string
 *         collectionDateTime:
 *           type: string
 *           format: date-time
 *         startedAt:
 *           type: string
 *           format: date-time
 *         completedAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         createdBy:
 *           type: number
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         updatedBy:
 *           type: number
 *         deletedAt:
 *           type: string
 *           format: date-time
 *         deletedBy:
 *           type: number
 */


/**
 * @swagger
 * /api/v1/milk_collections:
 *   get:
 *     tags: [Milk Collections]
 *     summary: Retrieve Milk Collections
 *     description: Retrieve All Milk Collections. If `id`, `shift` or `status` query parameter is provided, it returns the particular filtered results. Otherwise, it returns all Milk Collections.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: ID of the Milk Collections 
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Status of the Milk Collections 
 *       - in: query
 *         name: shift
 *         schema:
 *           type: string
 *         description: Shift of the Milk Collections 
 *       - in: query
 *         name: organizationUnitId
 *         schema:
 *           type: number
 *         description: filter for a perticular organization unit id 
 *       - in: query
 *         name: filterDate
 *         schema:
 *           type: date
 *         description: filter for a perticular organization unit id 
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
 *                     $ref: '#/components/schemas/AllMilkCollectionsModel'
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
milkCollectionsRouter.get("/", VerifyToken, VerifyUser("Read", "MilkCollection"), MilkCollectionsController.GetAllMilkCollections);

milkCollectionsRouter.get("/portal", VerifyToken, VerifyUser("Read", "MilkCollection"), MilkCollectionsController.GetMilkCollectionsPortal);

milkCollectionsRouter.get("/unlocked_billing_cycles", VerifyToken, VerifyUser("Read", "MilkCollection"), MilkCollectionsController.GetUnlockedBillingCycles);

/**
 * @swagger
 * /api/v1/milk_collections/routes:
 *   get:
 *     summary: Get Milk Collection Routes
 *     description: This API endpoint allows to Get the Milk Collection Routes.
 *     tags: [Milk Collections]
 *     parameters:
 *       - in: query
 *         name: routeOwnerId
 *         schema:
 *           type: number
 *         description: ID of the Route owner from the organization unit table 
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
milkCollectionsRouter.get("/routes",VerifyToken, VerifyUser("Read", "MilkCollection"), MilkCollectionsController.GetMilkRoutes);

/**
 * @swagger
 * /api/v1/milk_collections:
 *   post:
 *     summary: Create Milk Collection
 *     description: This API endpoint allows to Create a new Milk Collection.
 *     tags: [Milk Collections]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "b1aa0719-d001-43c2-9864-e18c118be879"
 *                 name:
 *                   type: string
 *                   example: "milk collection 1"
 *                 shift:
 *                   type: string
 *                   example: "shift"
 *                 status:
 *                   type: string
 *                   example: "status"
 *                 collectionDateTime:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 startedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 completedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 createdBy:
 *                   type: number
 *                   example: 1
 *                 updatedBy:
 *                   type: number
 *                   example: 1
 *                 deletedBy:
 *                   type: number
 *                   example: 1
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
milkCollectionsRouter.post("/",VerifyToken, VerifyUser("Create", "MilkCollection"), MilkCollectionsController.CreateMilkCollection);

/**
 * @swagger
 * /api/v1/milk_collections:
 *   put:
 *     summary: Update Milk Collection
 *     description: This API endpoint allows to Update a Milk Collection.
 *     tags: [Milk Collections]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "b1aa0719-d001-43c2-9864-e18c118be879"
 *                 name:
 *                   type: string
 *                   example: "milk collection 1"
 *                 shift:
 *                   type: string
 *                   example: "shift"
 *                 status:
 *                   type: string
 *                   example: "status"
 *                 collectionDateTime:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 startedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 completedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2022-01-01T12:00:00Z"
 *                 createdBy:
 *                   type: number
 *                   example: 1
 *                 updatedBy:
 *                   type: number
 *                   example: 1
 *                 deletedBy:
 *                   type: number
 *                   example: 1
 *                 fat:
 *                   type: number
 *                   example: 1
 *                 clr:
 *                   type: number
 *                   example: 1
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
milkCollectionsRouter.put("/",VerifyToken, VerifyUser("Update", "MilkCollection"), MilkCollectionsController.UpdateMilkCollection);
milkCollectionsRouter.put("/lock_milk_bill",VerifyToken, VerifyUser("Update", "MilkCollection"), MilkCollectionsController.LockMilkBill);

/**
 * @swagger
 * /api/v1/milk_collections/{id}:
 *   delete:
 *     summary: Delete Milk Collection
 *     description: This API endpoint deletes a Milk Collection based on the provided ID.
 *     tags: [Milk Collections]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Milk Collection to delete
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
milkCollectionsRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "MilkCollection"), MilkCollectionsController.DeleteMilkCollection);

export { milkCollectionsRouter }