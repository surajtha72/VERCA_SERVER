import { Request, Response } from "express";
import * as loginServices from "../services/LoginServices";
import { ChangePasswordModel, LoginModel } from "../models/LoginModel";

async function Login(req: Request, res: Response) {
  let model = new LoginModel(req.body);
  var response = await loginServices.Login(model);
  res.json(response);
}

async function ChangePassword(req: Request, res: Response) {
  let model = new ChangePasswordModel(req.body);
  var response = await loginServices.ChangePassword(model);
  res.json(response);
}

async function AppLogin(req: Request, res: Response) {
  let model = new LoginModel(req.body);
  var response = await loginServices.AppLogin(model);
  res.json(response);
}

async function ChangeAppLoginPassword(req: Request, res: Response) {
  let model = new ChangePasswordModel(req.body);
  var response = await loginServices.ChangeAppLoginPassword(model);
  res.json(response);
}

export { Login, ChangePassword, AppLogin, ChangeAppLoginPassword };
