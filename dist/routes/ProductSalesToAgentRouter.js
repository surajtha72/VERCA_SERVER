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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSalesToAgentRouter = void 0;
const express_1 = __importDefault(require("express"));
const ProductSalesToAgentController = __importStar(require("../controllers/ProductSalesToAgentController"));
const Authorization_1 = require("../Authorization");
let productSalesToAgentRouter = express_1.default.Router();
exports.productSalesToAgentRouter = productSalesToAgentRouter;
productSalesToAgentRouter.get("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "Products"), ProductSalesToAgentController.GetProductSalesToAgent);
productSalesToAgentRouter.post("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "Products"), ProductSalesToAgentController.CreateProductSalesToAgent);
productSalesToAgentRouter.get("/otp", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Read", "Products"), ProductSalesToAgentController.GetOtp);
productSalesToAgentRouter.post("/otp", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Create", "Products"), ProductSalesToAgentController.CreateOtp);
productSalesToAgentRouter.put("/", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Update", "Products"), ProductSalesToAgentController.UpdateProductSalesToAgent);
productSalesToAgentRouter.delete("/:id", Authorization_1.VerifyToken, (0, Authorization_1.VerifyUser)("Delete", "Products"), ProductSalesToAgentController.DeleteProductSale);
productSalesToAgentRouter.get("/total_balance", ProductSalesToAgentController.GetTotalBalance);
