import express from "express";
import { addCheckOut, getCheckOut } from "../controllers/check-out.controller";

const checkOutRoute = express.Router();

checkOutRoute.get("/", getCheckOut)
checkOutRoute.put("/", addCheckOut)


export default checkOutRoute;