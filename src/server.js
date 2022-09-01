"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = exports.ioServer = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("./routes");
const server = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(server);
exports.httpServer = httpServer;
const ioServer = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "*",
    }
});
exports.ioServer = ioServer;
server.use((0, cors_1.default)());
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
server.use(express_1.default.json());
server.use((0, morgan_1.default)('dev'));
mongoose_1.default.set("toJSON", {
    virtuals: true,
    transform: (_, converted) => {
        delete converted._id;
    },
});
server.use(routes_1.routes);
