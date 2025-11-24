"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAutoWeighbridgeData = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Net = require('net');
const portW = process.env.WEIGHBRIDGE_PORT;
const host = process.env.WEIGHBRIDGE_HOST;
let receivedData;
let flag = false;
function GetAutoWeighbridgeData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = new Net.Socket();
            client.connect({ port: portW, host: host }, function () {
                console.log('TCP connection established with the server.');
                flag = true;
            });
            client.on('data', function (chunk) {
                console.log(`Data received from the server: ${chunk.toString()}.`);
                receivedData = chunk.toString();
                client.end();
                flag = false;
            });
            client.on('error', function (error) {
                console.error('An error occurred:', error);
                flag = false;
            });
            if (flag) {
                return {
                    status: 200,
                    message: "Success",
                    data: receivedData,
                };
            }
            else {
                return {
                    status: 500,
                    message: "Couldn't connect to the server",
                    data: null,
                };
            }
        }
        catch (error) {
            return {
                status: 500,
                message: error,
                data: null,
            };
        }
    });
}
exports.GetAutoWeighbridgeData = GetAutoWeighbridgeData;
