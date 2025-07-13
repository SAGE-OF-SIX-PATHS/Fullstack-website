import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
  });
});

app.use("/auth", authRoutes);
app.use("/products", productroutes);
app.use("/user", authenticate, userRoutes);
app.use("/sessions", authenticate, sessionRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || ENV_PORT;

if (!PORT) {
  throw new Error("❌ PORT not defined! Set it in your env or through the host.");
}

app.listen(PORT, async () => {
  console.log(`✅ Server listening on port ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});
