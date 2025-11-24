import { Request, Response } from "express";
import * as complaintsService from '../services/ComplaintsService'
import { CreateComplaintModel, UpdateComplaintModel } from "../models/ComplaintsModel";
async function GetAllComplaints(req: Request, res: Response) {
    const model = req.query;
    if(model){
        const response = await complaintsService.GetAllComplaints(model);
        res.json(response);
    } else {
        const response = await complaintsService.GetAllComplaints();
        res.json(response);
    }
}

async function CreateComplaint(req: Request, res: Response) {
    const model = new CreateComplaintModel(req.body);
    const response = await complaintsService.CreateComplaint(req, model);
    res.json(response);
}

async function UpdateComplaint(req: Request, res: Response) {
    const model = new UpdateComplaintModel(req.body);
    const response = await complaintsService.UpdateComplaint(req, model);
    res.json(response);
}
export { GetAllComplaints, CreateComplaint, UpdateComplaint };