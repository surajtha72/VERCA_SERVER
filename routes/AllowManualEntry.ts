import express from "express";
import * as ManualEntryController from "../controllers/ManualEntryController";
import { VerifyToken, VerifyUser } from "../Authorization";

const allowManualEntryRouter = express.Router();

allowManualEntryRouter.get("/", VerifyToken, VerifyUser("Read", "MilkCollection"), ManualEntryController.GetManualEntry);

allowManualEntryRouter.post("/", VerifyToken, VerifyUser("Create", "MilkCollection"), ManualEntryController.CreateManualEntry);

allowManualEntryRouter.put("/", VerifyToken, VerifyUser("Update", "MilkCollection"), ManualEntryController.UpdateManualEntry);

allowManualEntryRouter.delete("/:id", VerifyToken, VerifyUser("Delete", "MilkCollection"), ManualEntryController.DeleteManualEntry);

export { allowManualEntryRouter };
