import { RequestHandler } from "express";
import appAssert from "../utils/appAssert";
import AppErrorCode from "../constants/appErrorCode";
import { UNAUTHORIZED } from "../constants/http";
import { verifyToken } from "../utils/jwt";
import { AuthenticatedRequest } from "../types/CustomRequest";


//imports for google auth
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from "../models/user.model";
// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      sessionId?: string;
    }
  }
}

// wrap with catchErrors() if you need this to be async
const authenticate: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Not authorized",
    AppErrorCode.InvalidAccessToken
  );

  const { error, payload } = verifyToken(accessToken);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid token",
    AppErrorCode.InvalidAccessToken
  );

  // Type assertion to ensure payload has the expected structure
  const typedPayload = payload as { userId: string; sessionId: string };

  req.userId = typedPayload.userId;
  req.sessionId = typedPayload.sessionId;
  next();
};

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).json({ message: 'User not found' });
      return;
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};


export default authenticate;