import { Request, Response } from "express";
import * as compositeSampleTestServices from "../services/CompositeSampleTestServices";
import { CreateCompositeSampleTestModel, DeleteCompositeSampleTestModel, UpdateCompositeSampleTestModel } from "../models/CompositeSampleTestModel";


async function GetCompositeSampleTest(req: Request, res: Response) {
    const model = req.query;
    if (model) {
        const response = await compositeSampleTestServices.GetCompositeSampleTest(model);
        res.json(response);
    } else {
        const response = await compositeSampleTestServices.GetCompositeSampleTest();
        res.json(response);
    }
}

async function CreateCompositeSampleTest(req: Request, res: Response) {
    let roleModel = new CreateCompositeSampleTestModel(req.body);
    const response = await compositeSampleTestServices.CreateCompositeSampleTest(req, roleModel);
    res.json(response);
}

async function UpdateCompositeSampleTest(req: Request, res: Response) {
    let roleModel = new UpdateCompositeSampleTestModel(req.body);
    const response = await compositeSampleTestServices.UpdateCompositeSampleTest(req, roleModel);
    res.json(response);
}

async function DeleteCompositeSampleTest(req: Request, res: Response) {
    let model = new DeleteCompositeSampleTestModel(req.params);
    const response = await compositeSampleTestServices.DeleteCompositeSampleTest(req, model);
    res.json(response);
}

export { GetCompositeSampleTest, CreateCompositeSampleTest, UpdateCompositeSampleTest, DeleteCompositeSampleTest };