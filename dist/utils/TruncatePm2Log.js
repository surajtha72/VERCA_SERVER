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
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncateFn = void 0;
const path = require("node:path");
const truncateFn = () => __awaiter(void 0, void 0, void 0, function* () {
    var fs = require("fs"); // Load the filesystem module
    var locationErr = path.join("/home/ubuntu/.pm2/logs/server-error.log");
    var locationOut = path.join("/home/ubuntu/.pm2/logs/server-out.log");
    var statsErr = fs.statSync(locationErr);
    var statsOut = fs.statSync(locationOut);
    var fileSizeInBytesErr = statsErr.size;
    var fileSizeInBytesOut = statsOut.size;
    // Convert the file size to megabytes (optional)
    var fileSizeInMegabytesErr = fileSizeInBytesErr / (1024 * 1024);
    var fileSizeInMegabytesOut = fileSizeInBytesOut / (1024 * 1024);
    if (fileSizeInMegabytesErr > 1) {
        fs.truncate(locationErr, 0, function () {
            console.log("Err file Truncate successfull");
            return 1;
        });
    }
    if (fileSizeInMegabytesOut > 1) {
        fs.truncate(locationOut, 0, function () {
            console.log("Out file Truncate successfull");
            return 1;
        });
    }
    console.log("File size not exceeded");
    return 0;
});
exports.truncateFn = truncateFn;
