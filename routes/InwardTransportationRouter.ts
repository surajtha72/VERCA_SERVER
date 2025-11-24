import * as express from "express";
import * as inwardTransportationController from "../controllers/InwardTransportationController";
import { VerifyToken, VerifyUser } from "../Authorization";
let inwardTransportationRouter = express.Router();

inwardTransportationRouter.post("/",VerifyToken, inwardTransportationController.GetInwardTransportation);

inwardTransportationRouter.post("/vehicle_attendance",VerifyToken, inwardTransportationController.GetVehicleAttendance);

export { inwardTransportationRouter }