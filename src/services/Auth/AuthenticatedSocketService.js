"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticatedSocketService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const configs_1 = require("../../configs");
const repositories_1 = require("../../repositories");
dotenv_1.default.config();
const { JWT_STRING } = configs_1.configs.variables.app;
exports.AuthenticatedSocketService = {
    async execute(socket, next) {
        try {
            const token = socket.handshake.auth.token;
            const data = jsonwebtoken_1.default.verify(token.split(" ")[1], JWT_STRING);
            const _repo = (0, repositories_1.userRepository)();
            const user = await _repo.findById(data.id);
            if (!user) {
                return next(new Error("Authentication error"));
            }
            socket.user = user;
            next();
        }
        catch (err) {
            return next(new Error("Authentication error"));
        }
    }
};
