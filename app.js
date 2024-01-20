"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { createServer } from "http";
// import { Server } from "socket.io";
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const database_1 = __importDefault(require("./src/config/database"));
const auth_route_1 = __importDefault(require("./src/routes/auth.route"));
const check_in_route_1 = __importDefault(require("./src/routes/check-in.route"));
const check_out_route_1 = __importDefault(require("./src/routes/check-out.route"));
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   /* options */
// });
const Router = express_1.default.Router();
Router.get("/", (req, res) => {
    res.send("<h1>Welcome to EntrySphere Backend</h1>");
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/auth", auth_route_1.default);
app.use("/", Router);
app.use("/check-in", check_in_route_1.default);
app.use("/check-out", check_out_route_1.default);
// io.on("connection", (socket) => {});
app.listen(8000, () => {
    (0, database_1.default)();
    console.log("Server listening on port 8000");
});
