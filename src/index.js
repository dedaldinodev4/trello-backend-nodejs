"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const repositories_1 = require("./repositories");
const server_1 = require("./server");
const configs_1 = require("./configs");
const Socket_1 = require("./dtos/Socket");
const services_1 = require("./services");
dotenv_1.default.config();
const { APP_PORT, JWT_STRING } = configs_1.configs.variables.app;
const { MONGO_STRING, MONGO_CLUSTER, MONGO_DB } = configs_1.configs.variables.mongo;
const _PORT = APP_PORT || 5050;
server_1.ioServer
    .use(async (socket, next) => {
    try {
        const tokenString = socket.handshake.auth.token;
        if (!tokenString) {
            return next(new Error("Authentication error, Token a missing"));
        }
        const _repository = (0, repositories_1.userRepository)();
        const [, token] = tokenString.split(" ");
        const data = jsonwebtoken_1.default.verify(token, JWT_STRING);
        const user = await _repository.findById(data.id);
        if (!user) {
            return next(new Error("Authentication error"));
        }
        socket.user = user;
        next();
    }
    catch (err) {
        return next(new Error("Authentication error catch"));
    }
})
    .on("connection", (socket) => {
    socket.on(Socket_1.ISocketEvents.boardsJoin, (data) => {
        services_1.JoinBoardService.execute(server_1.ioServer, socket, data);
    });
    socket.on(Socket_1.ISocketEvents.boardsLeave, (data) => {
        services_1.LeaveBoardService.execute(server_1.ioServer, socket, data);
    });
    socket.on(Socket_1.ISocketEvents.columnsCreate, data => {
        services_1.CreateColumnService.execute(server_1.ioServer, socket, data);
    });
    socket.on(Socket_1.ISocketEvents.tasksCreate, data => {
        services_1.CreateTaskService.execute(server_1.ioServer, socket, data);
    });
    socket.on(Socket_1.ISocketEvents.boardsUpdate, data => {
        services_1.UpdateBoardService.execute(server_1.ioServer, socket, data);
    });
    socket.on(Socket_1.ISocketEvents.boardsDelete, data => {
        services_1.DeleteBoardService.execute(server_1.ioServer, socket, data);
    });
    socket.on(Socket_1.ISocketEvents.columnsUpdate, data => {
        services_1.UpdateColumnService.execute(server_1.ioServer, socket, data);
    });
    socket.on(Socket_1.ISocketEvents.columnsDelete, data => {
        services_1.DeleteColumnService.execute(server_1.ioServer, socket, data);
    });
    socket.on(Socket_1.ISocketEvents.tasksUpdate, data => {
        services_1.UpdateTaskService.execute(server_1.ioServer, socket, data);
    });
    socket.on(Socket_1.ISocketEvents.tasksDelete, data => {
        console.log('Event task deleted');
        services_1.DeleteTaskService.execute(server_1.ioServer, socket, data);
    });
});
mongoose_1.default.connect(`${MONGO_CLUSTER}`)
    .then(res => console.log('Database connected.'))
    .catch(err => console.log(err));
server_1.httpServer.listen(_PORT, () => {
    console.log(`Api is listening on port ${_PORT}`);
});
