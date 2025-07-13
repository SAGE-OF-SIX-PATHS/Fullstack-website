import { Request } from "express";
import { IUser } from "../../models/user.model";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
    sessionId?: string;
  }
}
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
