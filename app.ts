// import { createServer } from "http";
// import { Server } from "socket.io";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import Cors from "cors"
const app = express();
import connection from "./src/config/database";
import AuthRouter from "./src/routes/auth.route";
import checkInRoute from "./src/routes/check-in.route";

// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   /* options */
// });
const Router = express.Router();
Router.get("/", (req, res) => {
  res.send("<h1>Welcome to EntrySphere Backend</h1>");
});
app.use(express.json());
app.use(Cors());
app.use("/auth", AuthRouter);
app.use("/", Router);
app.use("/check-in", checkInRoute);
// io.on("connection", (socket) => {});

app.listen(8000, () => {
  connection();
  console.log("Server listening on port 8000");
});
