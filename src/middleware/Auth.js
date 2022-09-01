"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = exports.ensuredAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const configs_1 = require("../configs");
const repositories_1 = require("../repositories");
const { JWT_STRING } = configs_1.configs.variables.app;
const ensuredAuthenticated = () => {
    return async (request, response, next) => {
        try {
            const authHeader = request.headers.authorization;
            if (!authHeader) {
                return response.status(401).json({ error: 'Token is missing' });
            }
            const _repository = (0, repositories_1.userRepository)();
            const [, token] = authHeader.split(" ");
            const data = jsonwebtoken_1.default.verify(token, JWT_STRING);
            const user = await _repository.findById(data.id);
            if (!user) {
                return response.status(401).json({ error: 'Token is invalid.' });
            }
            request.user = user;
            next();
        }
        catch (err) {
            return response.status(401).json({ error: err });
        }
    };
};
exports.ensuredAuthenticated = ensuredAuthenticated;
const currentUser = () => {
    return async (request, response) => {
        if (!request.user) {
            return response.sendStatus(401);
        }
        const { user } = request;
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, JWT_STRING, { expiresIn: "2h" });
        const userCurrent = {
            id: user._id,
            email: user.email,
            username: user.username,
            token
        };
        response.send(userCurrent);
    };
};
exports.currentUser = currentUser;
