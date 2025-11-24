import express from "express";
import { VerifyToken, VerifyUser } from "../Authorization";
import * as complaintsController from "../controllers/ComplaintsController"
const complaintsRouter = express.Router();

complaintsRouter.get("/", VerifyToken, VerifyUser("Read", "BillingCycleMaster"), complaintsController.GetAllComplaints);
complaintsRouter.post("/", VerifyToken, VerifyUser("Read", "BillingCycleMaster"), complaintsController.CreateComplaint);
complaintsRouter.put("/", VerifyToken, VerifyUser("Read", "BillingCycleMaster"), complaintsController.UpdateComplaint);

export { complaintsRouter };
