import * as express from "express";
import * as OrganizationsController from "../controllers/OrganizationsController";
import { VerifyToken, VerifyUser } from "../Authorization";
let organizationsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: Endpoints for Organizations management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllOrganizationsModel:
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
 * /api/v1/organizations:
 *   get:
 *     tags: [Organizations]
 *     summary: Retrieve Organizations
 *     description: Retrieve all Organizations Center Characteristics. If `id` query parameter is provided, it returns a single Organization characteristic. Otherwise, it returns all Organizations.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Organizations
 *       - in: query
 *         name: organization
 *         schema:
 *           type: integer
 *         description: ID of the Organization Unit Type
 *       - in: query
 *         name: parentId
 *         schema:
 *           type: integer
 *         description: Parent ID of the Organization Unit
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
 *                     $ref: '#/components/schemas/AllOrganizationsModel'
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
organizationsRouter.get(
    "/",
    VerifyToken,
    VerifyUser("Read", "Organization"),
    OrganizationsController.GetOrganizations
  );
  
/**
 * @swagger
 * /api/v1/organizations:
 *   post:
 *     summary: Create Organization
 *     description: This API endpoint allows to Create a new Organization.
 *     tags: [Organizations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 organizationType:
 *                   type: number
 *                   example: 1
 *                 parentId:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "name"
 *                 businessRegnNo:
 *                   type: string
 *                   example: "reg no"
 *                 gstNo:
 *                   type: string
 *                   example: "gst no"
 *                 addressLine1:
 *                   type: string
 *                   example: "address1"
 *                 addressLine2:
 *                   type: string
 *                   example: "address2"
 *                 vctId:
 *                   type: number
 *                   example: 1
 *                 geocode:
 *                   type: string
 *                   example: "geocode"
 *                 capacity:
 *                   type: number
 *                   example: "capacity"
 *                 morningShiftStartTime:
 *                   type: string
 *                   format: time
 *                   example: "09:00:00"
 *                 morningShiftEndTime:
 *                   type: string
 *                   format: time
 *                   example: "09:00:00"
 *                 eveningShiftStartTime:
 *                   type: string
 *                   format: time
 *                   example: "09:00:00"
 *                 eveningShiftEndTime:
 *                   type: string
 *                   format: time
 *                   example: "09:00:00"
 *                 defaultCollectionType:
 *                   type: number
 *                   example: 1
 *                 payrollTypes:
 *                   type: number
 *                   example: 1
 *                 enforceStrictTiming:
 *                   type: boolean
 *                   example: true
 *                 enforceNoDueCollection:
 *                   type: boolean
 *                   example: true
 *                 headload:
 *                   type: number
 *                   example: 1
 *                 commission:
 *                   type: number
 *                   example: 1
 *                 stateId:
 *                   type: number
 *                   example: 1
 *                 districtId:
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
organizationsRouter.post("/",VerifyToken, VerifyUser("Create", "Organization"), OrganizationsController.CreateOrganizations);

/**
 * @swagger
 * /api/v1/organizations:
 *   put:
 *     summary: Update Organization
 *     description: This API endpoint allows to Update an Organization.
 *     tags: [Organizations]
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
 *                 organizationType:
 *                   type: number
 *                   example: 1
 *                 parentId:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "name"
 *                 businessRegnNo:
 *                   type: string
 *                   example: "reg no"
 *                 gstNo:
 *                   type: string
 *                   example: "gst no"
 *                 addressLine1:
 *                   type: string
 *                   example: "address1"
 *                 addressLine2:
 *                   type: string
 *                   example: "address2"
 *                 vctId:
 *                   type: number
 *                   example: 1
 *                 geocode:
 *                   type: string
 *                   example: "geocode"
 *                 capacity:
 *                   type: number
 *                   example: "capacity"
 *                 morningShiftStartTime:
 *                   type: string
 *                   format: time
 *                   example: "09:00:00"
 *                 morningShiftEndTime:
 *                   type: string
 *                   format: time
 *                   example: "09:00:00"
 *                 eveningShiftStartTime:
 *                   type: string
 *                   format: time
 *                   example: "09:00:00"
 *                 eveningShiftEndTime:
 *                   type: string
 *                   format: time
 *                   example: "09:00:00"
 *                 defaultCollectionType:
 *                   type: number
 *                   example: 1
 *                 payrollTypes:
 *                   type: number
 *                   example: 1
 *                 enforceStrictTiming:
 *                   type: boolean
 *                   example: true
 *                 enforceNoDueCollection:
 *                   type: boolean
 *                   example: true
 *                 headload:
 *                   type: number
 *                   example: 1
 *                 commission:
 *                   type: number
 *                   example: 1
 *                 stateId:
 *                   type: number
 *                   example: 1
 *                 districtId:
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
organizationsRouter.put("/",VerifyToken, VerifyUser("Update", "Organization"), OrganizationsController.UpdateOrganizations);

/**
 * @swagger
 * /api/v1/organizations/{id}:
 *   delete:
 *     summary: Delete Organization
 *     description: This API endpoint deletes a Organization based on the provided ID.
 *     tags: [Organizations]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Organization to delete
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
organizationsRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "Organization"), OrganizationsController.DeleteOrganizations);

export { organizationsRouter }