  import { Request, Response } from "express";
  import * as userService from "../services/UserService";
  import{
      CreateUserModel,
      UpdateUserModel,
      DeleteUserModel,
      AllUsersModel
  }from '../models/UsersModel'

  async function GetAllUsers(req: Request, res: Response) {
      const model = req.query;
      if (model) {
      const response = await userService.GetAllUsers(model);
      res.json(response);
      } else {
      const response = await userService.GetAllUsers();
      res.json(response);
      }
  }

  async function CreateUser(req: Request, res: Response) {
      let userModel = new CreateUserModel(req.body);
      const response = await userService.CreateUser(
        req,
        userModel
      );
      res.json(response);
    }

    async function UpdateUser(req: Request, res: Response) {
      let userModel = new UpdateUserModel(req.body);
      const response = await userService.UpdateUser(
        req,
        userModel
      );
      res.json(response);
    }

    async function DeleteUser(req: Request, res: Response) {
      let model = new DeleteUserModel(req.params);
      const response = await userService.DeleteUser(req, model);
      res.json(response);
    }

    async function CheckManualEntry(req: Request, res: Response) {
      const { userId, aadhaarNo } = req.query;
      const response = await userService.CheckManualEntry({ userId: userId, aadhaarNo: aadhaarNo });
      res.json(response);
    }

    async function CheckCollectionEntry(req: Request, res: Response) {
      const { userId, aadhaarNo } = req.query;
      const response = await userService.CheckCollectionEntry({ userId: userId, aadhaarNo: aadhaarNo });
      res.json(response);
    }
    

    export{
      GetAllUsers,
      CreateUser,
      UpdateUser,
      DeleteUser,
      CheckManualEntry,
      CheckCollectionEntry
    }