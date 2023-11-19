import express from "express";
import { register } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.get("/", async (req: any, res: any) => {
  res.send("Welcome to EntryShere's backend");
});

authRouter.post("/register", register);

export default authRouter;
