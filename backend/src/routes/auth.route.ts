import { Router, Request, Response } from "express";
import {
  sendPasswordResetHandler,
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerHandler,
  resetPasswordHandler,
  verifyEmailHandler,
  googleAuthHandler,
} from "../controllers/auth.controller";
import { protect } from "../middleware/authenticate";
import { AuthenticatedRequest } from "../types/CustomRequest"; // Your custom type that extends Request

const authRoutes = Router();

// prefix: /auth
authRoutes.post("/register", registerHandler);
authRoutes.post("/login", loginHandler);
authRoutes.get("/refresh", refreshHandler);
authRoutes.get("/logout", logoutHandler);
authRoutes.get("/email/verify/:code", verifyEmailHandler);
authRoutes.post("/password/forgot", sendPasswordResetHandler);
authRoutes.post("/password/reset", resetPasswordHandler);
authRoutes.post("/google", googleAuthHandler);

// ✅ Protected route with proper typings
authRoutes.get('/protected', protect, (req: Request, res: Response) => {
  const user = (req as AuthenticatedRequest).user;

  if (!user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  res.json({ message: `Welcome ${user.name}`, user });
});
export default authRoutes;
