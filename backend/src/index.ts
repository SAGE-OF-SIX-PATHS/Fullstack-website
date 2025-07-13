import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./config/db";
import errorHandler from "./middleware/errorHandler";
import authenticate from "./middleware/authenticate";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import sessionRoutes from "./routes/session.route";
import productroutes from "./routes/product.route";
import { APP_ORIGIN, NODE_ENV, PORT as ENV_PORT } from "./constants/env";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

// Health check
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
  });
});

// Routes
app.use("/auth", authRoutes);
app.use("/products", productroutes);
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoutes);

// Error handler
app.use(errorHandler);

// ✅ CORRECT PORT BINDING
const PORT = process.env.PORT || ENV_PORT || 5000;

app.listen(PORT, async () => {
  console.log(`✅ Server listening on port ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});
