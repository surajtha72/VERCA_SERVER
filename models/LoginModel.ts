class LoginModel {
  constructor(data: any) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.deviceId = data.deviceId;
  }
  public id: number;
  public username: string;
  public password: string;
  public deviceId: string;
}

class ChangePasswordModel {
  constructor(data: any) {
    this.username = data.username;
    this.oldPassword = data.oldPassword;
    this.newPassword = data.newPassword;
  }
  public username: string;
  public oldPassword: string;
  public newPassword: string;
}

class JWTModel {
  constructor(data: any) {
    this.userId = data.userId;
    this.username = data.username;
    this.roleId = data.roleId;
    this.roleName = data.roleName;
  }
  public userId: number;
  public username: string;
  public roleId: number;
  public roleName: string;
}

export { LoginModel, JWTModel, ChangePasswordModel };
