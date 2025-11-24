"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordModel = exports.JWTModel = exports.LoginModel = void 0;
class LoginModel {
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.password = data.password;
        this.deviceId = data.deviceId;
    }
}
exports.LoginModel = LoginModel;
class ChangePasswordModel {
    constructor(data) {
        this.username = data.username;
        this.oldPassword = data.oldPassword;
        this.newPassword = data.newPassword;
    }
}
exports.ChangePasswordModel = ChangePasswordModel;
class JWTModel {
    constructor(data) {
        this.userId = data.userId;
        this.username = data.username;
        this.roleId = data.roleId;
        this.roleName = data.roleName;
    }
}
exports.JWTModel = JWTModel;
