import express from "express";
import { addCheckIn, getCheckIn } from "../controllers/check-in.controller";

const checkInRoute = express.Router();

checkInRoute.post("/", addCheckIn);
checkInRoute.get("/",getCheckIn);

export default checkInRoute;