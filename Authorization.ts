import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { AppDataSource } from "./db-config/DbConnection";
import * as entities from "./entities/Context";

export const VerifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get the token from the request header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token not provided" });
  }

  try {
    // verify the token using your secret key
    const key = process.env.TOKEN_SECRET;
    if (!key) {
      throw new Error("Token secret is not defined");
    }
    const decoded = jwt.verify(token, key as Secret);
    // attach the decoded payload to the request object for use in the route handler
    req.body.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid access token" });
  }
};

interface DecodedToken extends JwtPayload {
  roleId: number;
}

export const VerifyUser = (
  action: string,
  entityName: string
): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const key = process.env.TOKEN_SECRET;
      if (token && key) {
        const decode: DecodedToken = jwt.verify(token, key) as DecodedToken;
        const roleId = decode.role;
        // console.log(roleId, ":roleId");
        if (roleId === 1) {
          next();
          return;
        }
        const roleHasPermissionsRepository = AppDataSource.getRepository(
          entities.RoleHasPermissions
        );
        const permissions = await roleHasPermissionsRepository.find({
          where: {
            Roles: { Id: roleId },
            IsActive: true,
          },
          relations: ["Permissions", "Permissions.EntityList"],
        });

        const filteredPermissions = permissions.filter(permission => {
          return permission.Permissions.Action === action && permission.Permissions.EntityList.Name === entityName;
        });

        if (filteredPermissions.length > 0) {
          // console.log("Entity Matched");
          next();
        } else {
          return res.status(403).json({ status: 403, message: `No permission found for ${action} action on ${entityName}` });
        }
      } else {
        return res.status(403).json({ message: "Permission Denied" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
