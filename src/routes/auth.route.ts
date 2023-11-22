import express from "express";
import { login, register } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.get("/", async (req: any, res: any) => {
  res.send("Welcome to EntryShere's backend");
});

authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
