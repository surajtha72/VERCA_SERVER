"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeMasterRouter = void 0;
const express = __importStar(require("express"));
const RouteMasterController = __importStar(require("../controllers/RouteMasterController"));
const Authorization_1 = require("../Authorization");
let routeMasterRouter = express.Router();
exports.routeMasterRouter = routeMasterRouter;
/**
 * @swagger
 * tags:
 *   name: Route Master
 *   description: Endpoints for Route Master management
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     AllRouteMasterModel:
 *       type: object
 *       required:
 *         required:
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
 * /api/v1/route_master:
 *   get:
 *     tags: [Route Master]
 *     summary: Retrieve Route Master
 *     description: Retrieve Route Master Characteristics. If `id` query parameter is provided, it returns a single route master characteristic. Otherwise, it returns all route master characteristics.
 *     parameters:
 *       - in: query
 *         name: id
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
 *                     $ref: '#/components/schemas/AllRouteMasterModel'
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
routeMasterRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "RouteMaster"), RouteMasterController.GetRouteMaster);
/**
 * @swagger
 * /api/v1/route_master:
 *   post:
 *     summary: Create Route Master
 *     description: This API endpoint allows to Create a new Route Master.
 *     tags: [Route Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 routeTypeId:
 *                   type: number
 *                   example: 1
 *                 routeOwner:
 *                   type: number
 *                   example: 1
 *                 routeName:
 *                   type: string
 *                   example: "route name"
 *                 routeCode:
 *                   type: string
 *                   example: "route code"
 *                 tripType:
 *                   type: string
 *                   example: "trip type"
 *                 morningShiftSchTime:
 *                   type: string
 *                   format: time
 *                   example: "09:00:00"
 *                 eveningShiftSchTime:
 *                   type: string
 *                   format: time
 *                   example: "09:00:00"
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
routeMasterRouter.post("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "RouteMaster"), RouteMasterController.CreateRouteMaster);
/**
 * @swagger
 * /api/v1/route_master:
 *   put:
 *     summary: Update Route Master
 *     description: This API endpoint allows to Update a new Route Master.
 *     tags: [Route Master]
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
 *                 routeTypeId:
 *                   type: number
 *                   example: 1
 *                 routeOwner:
 *                   type: number
 *                   example: 1
 *                 routeName:
 *                   type: string
 *                   example: "route name"
 *                 routeCode:
 *                   type: string
 *                   example: "route code"
 *                 tripType:
 *                   type: string
 *                   example: "trip type"
 *                 morningShiftSchTime:
 *                   type: string
 *                   format: time
 *                   example: "09:00:00"
 *                 eveningShiftSchTime:
 *                   type: string
 *                   format: time
 *                   example: "09:00:00"
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
routeMasterRouter.put("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Update", "RouteMaster"), RouteMasterController.UpdateRouteMaster);
/**
 * @swagger
 * /api/v1/route_master/{id}:
 *   delete:
 *     summary: Delete Route Master
 *     description: This API endpoint deletes a Route Master based on the provided ID.
 *     tags: [Route Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Route Master to delete
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
routeMasterRouter.delete("/:id", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Delete", "RouteMaster"), RouteMasterController.DeleteRouteMaster);
