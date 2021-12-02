import { Router } from "express";
import { tes } from "./Auth";

// auth-route
const userRouter = Router();
userRouter.get("/tes", tes);

// Export the base-router
const baseRouter = Router();
baseRouter.use("/auth", userRouter);
export default baseRouter;
