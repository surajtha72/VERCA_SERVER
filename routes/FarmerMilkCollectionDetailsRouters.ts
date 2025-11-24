import * as express from "express";
import * as FarmerMilkCollectionDetailsController from "../controllers/FarmerMilkCollectionDetailsController";
import { VerifyToken, VerifyUser } from "../Authorization";
let farmerMilkCollectionDetailsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Farmer Milk Collection Details
 *   description: Endpoints for Milk Collection Details management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllFarmerMilkCollectionDetailsModel:
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
 *         clr:
 *           type: number
 *         protein:
 *           type: number
 *         lactose:
 *           type: number
 *         salt:
 *           type: number
 *         water:
 *           type: number
 *         temperature:
 *           type: number
 *         weight:
 *           type: number
 *         canCount:
 *           type: number
 *         collectedFrom:
 *           type: number
 *         sampleNumber:
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
 *         createdBy:
 *           type: number
 *         modifiedBy:
 *           type: number
 *         deletedBy:
 *           type: number
 */

/**
 * @swagger
 * /api/v1/farmer_milk_collection_details:
 *   get:
 *     tags: [Farmer Milk Collection Details]
 *     summary: Retrieve Milk Collection Details
 *     description: Retrieve All Milk Collection Details. If `id`, `milk collection id`, `milk type` or `operation type` query parameter is provided, it returns the particular filtered results. Otherwise, it returns all Milk Collections.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         description: ID of the Milk Collection Details
 *       - in: query
 *         name: milkCollectionId
 *         schema:
 *           type: string
 *         description: The Id of the Milk Collections
 *       - in: query
 *         name: milkType
 *         schema:
 *           type: string
 *         description: Milk Type
 *       - in: query
 *         name: operationType
 *         schema:
 *           type: string
 *         description: Operation Type
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
 *                     $ref: '#/components/schemas/AllFarmerMilkCollectionDetailsModel'
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
farmerMilkCollectionDetailsRouter.get(
  "/",
  VerifyToken,
  FarmerMilkCollectionDetailsController.GetAllFarmerMilkCollectionDetails
);

/**
 * @swagger
 * /api/v1/milk_collection_details:
 *   post:
 *     summary: Create Milk Collection Detail
 *     description: This API endpoint allows to Create a new Create Milk Collection Detail.
 *     tags: [Milk Collection Details]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 milkCollectionId:
 *                   type: string
 *                 milkType:
 *                   type: string
 *                   example: "milkType"
 *                 collectionOperationType:
 *                   type: string
 *                   example: "operationType"
 *                 testingOperationType:
 *                   type: string
 *                   example: "testing Operation"
 *                 fat:
 *                   type: number
 *                   example: 1
 *                 snf:
 *                   type: number
 *                   example: 1
 *                 clr:
 *                   type: number
 *                   example: 1
 *                 protein:
 *                   type: number
 *                   example: 1
 *                 lactose:
 *                   type: number
 *                   example: 1
 *                 salt:
 *                   type: number
 *                   example: 1
 *                 water:
 *                   type: number
 *                   example: 1
 *                 temperature:
 *                   type: number
 *                   example: 1
 *                 weight:
 *                   type: number
 *                   example: 1
 *                 sampleNumber:
 *                   type: number
 *                   example: 1
 *                 canCount:
 *                   type: number
 *                   example: 1
 *                 organizationUnitId:
 *                   type: number
 *                   example: 1
 *                 transporterVehicleId:
 *                   type: number
 *                   example: 1
 *                 routeId:
 *                   type: number
 *                   example: 1
 *                 collectedAt:
 *                   type: string
 *                   format: date-time
 *                 testedAt:
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
 *                 collectedBy:
 *                   type: number
 *                   example: 1
 *                 createdBy:
 *                   type: number
 *                   example: 1
 *                 modifiedBy:
 *                   type: number
 *                   example: 1
 *                 deletedBy:
 *                   type: number
 *                   example: 2
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
farmerMilkCollectionDetailsRouter.post(
  "/",
  VerifyToken,
  FarmerMilkCollectionDetailsController.CreateFarmerMilkCollectionDetails
);

/**
 * @swagger
 * /api/v1/farmer_milk_collection_details:
 *   put:
 *     summary: Update Farmer Milk Collection Detail
 *     description: This API endpoint allows to Update a Milk Collection Detail.
 *     tags: [Farmer Milk Collection Details]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 milkCollectionId:
 *                   type: string
 *                 milkType:
 *                   type: string
 *                   example: "milkType"
 *                 collectionOperationType:
 *                   type: string
 *                   example: "operationType"
 *                 testingOperationType:
 *                   type: string
 *                   example: "testing Operation"
 *                 fat:
 *                   type: number
 *                   example: 1
 *                 snf:
 *                   type: number
 *                   example: 1
 *                 clr:
 *                   type: number
 *                   example: 1
 *                 protein:
 *                   type: number
 *                   example: 1
 *                 lactose:
 *                   type: number
 *                   example: 1
 *                 salt:
 *                   type: number
 *                   example: 1
 *                 water:
 *                   type: number
 *                   example: 1
 *                 temperature:
 *                   type: number
 *                   example: 1
 *                 weight:
 *                   type: number
 *                   example: 1
 *                 sampleNumber:
 *                   type: number
 *                   example: 1
 *                 canCount:
 *                   type: number
 *                   example: 1
 *                 organizationUnitId:
 *                   type: number
 *                   example: 1
 *                 transporterVehicleId:
 *                   type: number
 *                   example: 1
 *                 routeId:
 *                   type: number
 *                   example: 1
 *                 collectedAt:
 *                   type: string
 *                   format: date-time
 *                 testedAt:
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
 *                 collectedBy:
 *                   type: number
 *                   example: 1
 *                 createdBy:
 *                   type: number
 *                   example: 1
 *                 modifiedBy:
 *                   type: number
 *                   example: 1
 *                 deletedBy:
 *                   type: number
 *                   example: 2
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
farmerMilkCollectionDetailsRouter.put(
  "/",
  VerifyToken,
  FarmerMilkCollectionDetailsController.UpdateFarmerMilkCollectionDetails
);

/**
 * @swagger
 * /api/v1/farmer_milk_collection_details/{id}:
 *   delete:
 *     summary: Delete Milk Collection Detail
 *     description: This API endpoint deletes a Milk Collection Detail based on the provided ID.
 *     tags: [Farmer Milk Collection Details]
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
farmerMilkCollectionDetailsRouter.delete(
  "/:id",
  VerifyToken,
  FarmerMilkCollectionDetailsController.DeleteFarmerMilkCollectionDetails
);

export { farmerMilkCollectionDetailsRouter };
