import * as express from "express";
import * as CyclemasterController from "../controllers/BillingCycleMasterController";
import { VerifyToken, VerifyUser } from "../Authorization";
let cycleMasterRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Billing Cycle Master
 *   description: Endpoints for Billing Cycle Master management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AllBillingCycleModel:
 *       type: object
 *       required:
 *         - id
 *         - financialYearId
 *         - cycleNo
 *         - startDate
 *         - endDate
 *       properties:
 *         id:
 *           type: number
 *         financialYearId:
 *           type: number
 *         cycleNo:
 *           type: number
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/cycle_master:
 *   get:
 *     tags: [Billing Cycle Master]
 *     summary: Retrieve Billing Cycle Master
 *     description: Retrieve All Cycle Master. If `id` query parameter is provided, it returns a single Cycle Master. Otherwise, it returns all Billing Cycle Master.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Billing Cycle Master 
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
 *                     $ref: '#/components/schemas/AllBillingCycleModel'
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
cycleMasterRouter.get("/", VerifyToken, VerifyUser("Read", "BillingCycleMaster"), CyclemasterController.GetAllCycleMaster);

/**
 * @swagger
 * /api/v1/cycle_master/get_bill:
 *   post:
 *     summary: Get Milk Collections Bill
 *     description: This API endpoint allows to Get the Milk Collection Bill.
 *     tags: [Billing Cycle Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-06'
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-06'
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
cycleMasterRouter.post("/get_bill",VerifyToken, CyclemasterController.GetBill);

/**
 * @swagger
 * /api/v1/cycle_master/get_bill_bmc:
 *   post:
 *     summary: Get Milk Collections Bill by BMC Id
 *     description: This API endpoint allows to Get the Milk Collection Bill.
 *     tags: [Billing Cycle Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-06'
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-08-06'
 *                 bmcId:
 *                   type: number
 *                   example: 2
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
cycleMasterRouter.post(
    "/get_bill_bmc",
    VerifyToken,
    CyclemasterController.GetBillByBMC
  );

  /**
 * @swagger
 * /api/v1/cycle_master/get_bill_bmc_routes:
 *   post:
 *     summary: Get Milk Collections Bill by BMC Id and Route Id.
 *     description: This API endpoint allows to Get the Milk Collection Bill.
 *     tags: [Billing Cycle Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-06'
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-06'
 *                 bmcId:
 *                   type: number
 *                   example: 2
 *                 routeId:
 *                   type: number
 *                   example: 1
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
cycleMasterRouter.post(
  "/get_bill_bmc_routes",
  VerifyToken,
  CyclemasterController.GetBillByBMCRoutes
);

/**
 * @swagger
 * /api/v1/cycle_master:
 *   post:
 *     summary: Create Cycle Master
 *     description: This API endpoint allows to Create a new Cycle Master.
 *     tags: [Billing Cycle Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 financialYearId:
 *                   type: number
 *                   example: 1
 *                 cycleNo:
 *                   type: number
 *                   example: 1
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                   example: '2023-07-06T15:30:00Z'
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                   example: '2023-07-06T15:30:00Z'
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
cycleMasterRouter.post("/", VerifyToken, VerifyUser("Create", "BillingCycleMaster"), CyclemasterController.CreateCycleMaster);

/**
 * @swagger
 * /api/v1/cycle_master:
 *   put:
 *     summary: Update Cycle Master
 *     description: This API endpoint allows to Update a Billing Cycle Master.
 *     tags: [Billing Cycle Master]
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
 *                 financialYearId:
 *                   type: number
 *                   example: 1
 *                 cycleNo:
 *                   type: number
 *                   example: 1
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                   example: '2023-07-06T15:30:00Z'
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                   example: '2023-07-06T15:30:00Z'
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
cycleMasterRouter.put("/", VerifyToken, VerifyUser("Update", "BillingCycleMaster"), CyclemasterController.UpdateCycleMaster);

/**
 * @swagger
 * /api/v1/cycle_master/{id}:
 *   delete:
 *     summary: Delete Cycle Master
 *     description: This API endpoint deletes a Billing Cycle Master based on the provided ID.
 *     tags: [Billing Cycle Master]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the Cycle Master to delete
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
cycleMasterRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "BillingCycleMaster"), CyclemasterController.DeleteCycleMaster);

/**
 * @swagger
 * /api/v1/get_rate_chart:
 *   get:
 *     tags: [Rate Chart]
 *     summary: Retrieve Active Rate Chart
 *     description: Retrieve All Cycle Master. If `id` query parameter is provided, it returns a single Cycle Master. Otherwise, it returns all Billing Cycle Master.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of the Billing Cycle Master 
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
 *                     $ref: '#/components/schemas/AllBillingCycleModel'
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
cycleMasterRouter.get("/ratechart", VerifyToken, VerifyUser("Read", "BillingCycleMaster"), CyclemasterController.GetRateChart);

/**
 * @swagger
 * /api/v1/cycle_master/get_bank_advice:
 *   post:
 *     summary: Get Milk Collections Bill by BMC Id
 *     description: This API endpoint allows to Get the Milk Collection Bill.
 *     tags: [Billing Cycle Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-06'
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-08-06'
 *                 bmcId:
 *                   type: number
 *                   example: 2
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
cycleMasterRouter.post(
  "/get_bank_advice",
  VerifyToken,
  CyclemasterController.GetBankAdvice
);

/**
 * @swagger
 * /api/v1/cycle_master/get_bank_letter_amount:
 *   post:
 *     summary: Get Milk Collections Bill by BMC Id
 *     description: This API endpoint allows to Get the Milk Collection Bill.
 *     tags: [Billing Cycle Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-06'
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-08-06'
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
cycleMasterRouter.post(
  "/get_bank_letter_amount",
  VerifyToken,
  CyclemasterController.GetBankLetterAmount
);

/**
 * @swagger
 * /api/v1/cycle_master/get_snf_reconcillation:
 *   post:
 *     summary: Get Milk Collections Bill by BMC Id
 *     description: This API endpoint allows to Get the Milk Collection Bill.
 *     tags: [Billing Cycle Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-06'
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-08-06'
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
cycleMasterRouter.post(
  "/get_bmc_snf_reconcillation",
  VerifyToken,
  CyclemasterController.GetBmcSnfReconcillation
);

/**
 * @swagger
 * /api/v1/cycle_master/get_agent_milk_collection:
 *   post:
 *     summary: Get Milk Collections Bill by BMC Id
 *     description: This API endpoint allows to Get the Milk Collection Bill.
 *     tags: [Billing Cycle Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-06'
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-08-06'
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
cycleMasterRouter.post(
  "/get_agent_milk_collection",
  VerifyToken,
  CyclemasterController.GetAgentWiseMilkCollection
);

/**
 * @swagger
 * /api/v1/cycle_master/get_date_wise_agent_collection:
 *   post:
 *     summary: Get Milk Collections Bill by BMC Id
 *     description: This API endpoint allows to Get the Milk Collection Bill.
 *     tags: [Billing Cycle Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-06'
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-08-06'
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
cycleMasterRouter.post(
  "/get_date_wise_agent_collection",
  VerifyToken,
  CyclemasterController.GetDateWiseAgentCollection
);

/**
 * @swagger
 * /api/v1/cycle_master/get_bmc_wise_milk_collection:
 *   post:
 *     summary: Get Milk Collections Bill by BMC Id
 *     description: This API endpoint allows to Get the Milk Collection Bill.
 *     tags: [Billing Cycle Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-06'
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-08-06'
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
cycleMasterRouter.post(
  "/get_bmc_wise_milk_collection",
  VerifyToken,
  CyclemasterController.GetBmcWiseMilkCollection
);

/**
 * @swagger
 * /api/v1/cycle_master/get_date_bmc_wise_milk_collection:
 *   post:
 *     summary: Get Milk Collections Bill by BMC Id
 *     description: This API endpoint allows to Get the Milk Collection Bill.
 *     tags: [Billing Cycle Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-06'
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-08-06'
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
cycleMasterRouter.post(
  "/get_date_bmc_wise_milk_collection",
  VerifyToken,
  CyclemasterController.GetDateWiseBmcMilkCollection
);

/**
 * @swagger
 * /api/v1/cycle_master/get_date_bmc_wise_milk_collection:
 *   post:
 *     summary: Get Milk Collections Bill by BMC Id
 *     description: This API endpoint allows to Get the Milk Collection Bill.
 *     tags: [Billing Cycle Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-06'
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-08-06'
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
cycleMasterRouter.post(
  "/get_route_wise_bmc_milk_collection",
  VerifyToken,
  CyclemasterController.GetRouteWiseBmcMilkCollection
);

/**
 * @swagger
 * /api/v1/cycle_master/get_bmc_wise_payment:
 *   post:
 *     summary: Get Milk Collections Bill by BMC Id
 *     description: This API endpoint allows to Get the Milk Collection Bill.
 *     tags: [Billing Cycle Master]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-07-06'
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   example: '2023-08-06'
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
cycleMasterRouter.post(
  "/get_bmc_wise_payment",
  VerifyToken,
  CyclemasterController.GetBmcWisePayment
);

cycleMasterRouter.post(
  "/get_payout_check_list",
  VerifyToken,
  CyclemasterController.GetPayoutCheckList
);

cycleMasterRouter.post(
  "/get_agent_ledger",
  VerifyToken,
  CyclemasterController.GetAgentLedger
);

cycleMasterRouter.post(
  "/krishibazar_report",
  VerifyToken,
  CyclemasterController.KrishiBazarReport
);

cycleMasterRouter.put("/lock_cycle",VerifyToken, CyclemasterController.LockCycle);

export { cycleMasterRouter };