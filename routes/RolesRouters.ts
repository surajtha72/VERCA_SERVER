import * as express from "express";
import * as RolesController from "../controllers/RolesController";
import { VerifyToken, VerifyUser } from "../Authorization";
let rolesRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Endpoints for Roles management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllRolesModel:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         description: 
 *           type: string
 */


/**
 * @swagger
 * /api/v1/roles:
 *   get:
 *     tags: [Roles]
 *     summary: Retrieve Roles
 *     description: Retrieve All Roles. If `id` query parameter is provided, it returns a single role. Otherwise, it returns all roles.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the roles 
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
 *                     $ref: '#/components/schemas/AllRolesModel'
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
rolesRouter.get("/", VerifyToken, VerifyUser("Read", "Roles"), RolesController.GetAllRoles);

/**
 * @swagger
 * /api/v1/roles/entity_and_permissions:
 *   post:
 *     summary: Get Entities and Permissions
 *     description: This API endpoint allows to get entities and permissions.
 *     tags: [Roles]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the role
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
rolesRouter.post("/entity_and_permissions",VerifyToken, RolesController.GetEntityAndPermissions);

/**
 * @swagger
 * /api/v1/roles:
 *   post:
 *     summary: Create Role
 *     description: This API endpoint allows to Create a new Role.
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: "roleName"
 *                 description:
 *                   type: string
 *                   example: "something"
 *                 permissionIds:
 *                   type: array 
 *                   items:
 *                     type: number
 *                     example: 1
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
rolesRouter.post("/",VerifyToken, VerifyUser("Create", "Roles"), RolesController.CreateRole);

/**
 * @swagger
 * /api/v1/roles:
 *   put:
 *     summary: Update a Role
 *     description: This API endpoint allows to Update a new Role.
 *     tags: [Roles]
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
 *                 name:
 *                   type: string
 *                   example: "roleName"
 *                 description:
 *                   type: string
 *                   example: "something"
 *                 permissionIds:
 *                   type: array 
 *                   items:
 *                     type: number
 *                     example: 1
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
rolesRouter.put("/",VerifyToken, VerifyUser("Update", "Roles"), RolesController.UpdateRole);

/**
 * @swagger
 * /api/v1/roles/{id}:
 *   delete:
 *     summary: Delete Role
 *     description: This API endpoint deletes a Role based on the provided ID.
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Role to delete
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
rolesRouter.delete("/:id", VerifyToken, VerifyUser("Update", "Roles"), RolesController.DeleteRole);

export { rolesRouter };
