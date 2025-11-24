import { AppDataSource } from "../db-config/DbConnection";
import { Complaints } from "../entities/Complaints";
import { CreateComplaintModel, GetComplaintsModel, UpdateComplaintModel } from "../models/ComplaintsModel";
import { APIResponse, ServiceResponse } from "../models/ApiResponse";
import { Request } from "express";
import { Organization } from "../entities/Organization";
import { BillingCycleMaster } from "../entities/BillingCycleMaster";
const jwt = require('jsonwebtoken');
import { Equal } from 'typeorm';
const moment = require('moment');


const ERROR_MESSAGES = {
    NO_DATA: "No Data",
    INTERNAL_SERVER: "Internal Server Error",
};

const SUCCESS_MESSAGES = {
    SUCCESS: "Success",
    ADD_SUCCESS: "Added Successfully",
    UPDATE_SUCCESS: "Updated Successfully",
    DELETE_SUCCESS: "Deleted Successfully",
};

async function GetAllComplaints(
    model?: any
): Promise<ServiceResponse<GetComplaintsModel[]>> {
    try {
        let complaints;
        if (model.agentId) {
            complaints = await AppDataSource.getRepository(Complaints)
                .createQueryBuilder("complaints")
                .where("complaints.AgentId =:agentId", { agentId: model.agentId })
                .getMany();
        }
        else if (model.billingCycleId) {
            complaints = await AppDataSource.getRepository(Complaints)
                .createQueryBuilder("complaints")
                .leftJoinAndSelect("complaints.AgentId", "agent")
                .leftJoinAndSelect("complaints.BillingCycleId", "billingCycle")
                .where("complaints.BillingCycleId =:billingCycleId", { billingCycleId: model.billingCycleId })
                .getMany();
        }
        else {
            complaints = await AppDataSource.getRepository(Complaints)
                .createQueryBuilder("complaints")
                .getMany();
        }

        const complaintsData: GetComplaintsModel[] = complaints.map((complaint) => ({
            id: complaint.Id,
            agentId: complaint.AgentId,
            billingCycleId: complaint.BillingCycleId,
            settlementAmount: complaint.SettlementAmount,
            complaint: complaint.Complaint,
            toBeSettledStartDate: complaint.TobeSettledStartDate,
            toBeSettledEndDate: complaint.TobeSettledEndDate
        }));

        return {
            status: 200,
            message: SUCCESS_MESSAGES.SUCCESS,
            data: complaintsData
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: ERROR_MESSAGES.INTERNAL_SERVER,
            data: null,
        };
    }
}

// async function CreateComplaint(req: Request, model: CreateComplaintModel): Promise<ServiceResponse<APIResponse[]>> {
//     try {
//         console.log('**************', model)
//         const token = req.headers.authorization?.split(" ")[1];
//         const key = process.env.TOKEN_SECRET;
//         const decode = jwt.verify(token, key);
//         const userId = decode.userId;

//         const complaintRepo = AppDataSource.getRepository(Complaints);
//         const complaint = new Complaints();

//         const agentRepo = AppDataSource.getRepository(Organization);
//         console.log('agent id ',model.agentId)
//         const agent = await agentRepo.findOne({
//             where: { Id: model.agentId }
//         })
//         const billingCycleRepo = AppDataSource.getRepository(BillingCycleMaster);
//         const billingCycle = await billingCycleRepo.findOne({
//             where: { Id: model.billingCycleId }
//         })
//         if (agent) {
//             complaint.AgentId = agent;
//         }
//         console.log(agent);
//         if (billingCycle) {
//             complaint.BillingCycleId = billingCycle;
//         }
//         console.log(billingCycle);
//         complaint.SettlementAmount = model.settlementAmount;
//         complaint.Complaint = model.complaint;
//         complaint.TobeSettledStartDate = model.toBeSettledStartDate;
//         complaint.TobeSettledEndDate = model.toBeSettledEndDate;
//         complaint.CreatedAt = new Date();
//         complaint.CreatedBy = userId;

//         await complaintRepo.save(complaint);

//         return {
//             status: 200,
//             message: SUCCESS_MESSAGES.ADD_SUCCESS,
//             data: null
//         }
//     } catch (err) {
//         console.log(err);
//         return {
//             status: 500,
//             message: ERROR_MESSAGES.INTERNAL_SERVER,
//             data: null
//         }
//     }
// }

async function CreateComplaint(req: Request, model: CreateComplaintModel): Promise<ServiceResponse<APIResponse[]>> {
    try {
        // console.log('**************', model);
        const token = req.headers.authorization?.split(" ")[1];
        const key = process.env.TOKEN_SECRET;
        const decode = jwt.verify(token, key);
        const userId = decode.userId;

        const complaintRepo = AppDataSource.getRepository(Complaints);

        const agentRepo = AppDataSource.getRepository(Organization);
        const billingCycleRepo = AppDataSource.getRepository(BillingCycleMaster);

        const agent = await agentRepo.findOne({ where: { Id: model.agentId } });
        const billingCycle = await billingCycleRepo.findOne({ where: { Id: model.billingCycleId } });

        if (!agent || !billingCycle) {
            console.log('Agent or Billing Cycle not found.');
            return {
                status: 404,
                message: 'Agent or Billing Cycle not found.',
                data: null
            };
        }

        // console.log('model',model.settlementAmount,billingCycle.Id,agent.Id);

        const existingComplaint = await complaintRepo.findOne({
            where: {
                //SettlementAmount: model.settlementAmount,
                Complaint: 'AUTO CF NEGATIVE PAYMENT',
                TobeSettledStartDate: moment(model.toBeSettledStartDate).format('YYYY-MM-DD HH:mm:ss'),
                // BillingCycleId: Equal(billingCycle.Id),
                AgentId: Equal(agent.Id)
            }
        });
        
        if (existingComplaint) {
            console.log('A complaint with the same details already exists. No action taken.');
            return {
                status: 200,
                message: 'A complaint with the same details already exists. No action taken.',
                data: null
            };
        } else {
            console.log('save new complaint');
        
            const complaint = new Complaints();
            complaint.AgentId = agent;
            complaint.BillingCycleId = billingCycle;
            complaint.SettlementAmount = model.settlementAmount;
            complaint.Complaint = model.complaint;
            complaint.TobeSettledStartDate = model.toBeSettledStartDate;
            complaint.TobeSettledEndDate = model.toBeSettledEndDate;
            complaint.CreatedAt = new Date();
            complaint.CreatedBy = userId;
        
            await complaintRepo.save(complaint);
        
            return {
                status: 200,
                message: SUCCESS_MESSAGES.ADD_SUCCESS,
                data: null
            };
        }

    } catch (err) {
        console.log(err);
        return {
            status: 500,
            message: ERROR_MESSAGES.INTERNAL_SERVER,
            data: null
        };
    }
}


async function UpdateComplaint(req: Request, model: UpdateComplaintModel): Promise<ServiceResponse<APIResponse>> {
    const token = req.headers.authorization?.split(" ")[1];
    const key = process.env.TOKEN_SECRET;
    const decode = jwt.verify(token, key);
    const userId = decode.userId;

    const complaintRepo = AppDataSource.getRepository(Complaints);
    const complaint = await complaintRepo.findOne({
        where: { Id: model.id }
    })

    if (complaint) {
        const agentRepo = AppDataSource.getRepository(Organization);
        const agent = await agentRepo.findOne({
            where: { Id: model.agentId }
        })
        const billingCycleRepo = AppDataSource.getRepository(BillingCycleMaster);
        const billingCycle = await billingCycleRepo.findOne({
            where: { Id: model.billingCycleId }
        })
        if (agent) {
            complaint.AgentId = agent;
        }
        console.log(agent);
        if (billingCycle) {
            complaint.BillingCycleId = billingCycle;
        }
        complaint.SettlementAmount = model.settlementAmount;
        complaint.Complaint = model.complaint;
        complaint.TobeSettledStartDate = model.toBeSettledStartDate;
        complaint.TobeSettledEndDate = model.toBeSettledEndDate;
        complaint.ModifiedAt = new Date();
        complaint.ModifiedBy = userId;
        await complaintRepo.save(complaint);

        return {
            status: 200,
            message: SUCCESS_MESSAGES.UPDATE_SUCCESS,
            data: null
        }
    } else {
        return {
            status: 401,
            message: ERROR_MESSAGES.NO_DATA,
            data: null
        }
    }
}

export {
    GetAllComplaints,
    CreateComplaint,
    UpdateComplaint
}