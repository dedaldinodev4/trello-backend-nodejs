"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const repositories_1 = require("../../repositories");
const configs_1 = require("../../configs");
dotenv_1.default.config();
const { JWT_STRING } = configs_1.configs.variables.app;
class RegisterService {
    async execute({ username, email, password }) {
        const _repository = (0, repositories_1.userRepository)();
        const userExists = await _repository.findOne({ email });
        if (userExists) {
            return new Error('User already exists!');
        }
        const user = new _repository({
            username,
            email,
            password
        });
        const userSave = await user.save();
        const token = jsonwebtoken_1.default.sign({ id: userSave._id, email: userSave.email }, JWT_STRING, { expiresIn: "2h" });
        return {
            id: user._id,
            email: user.email,
            username: user.username,
            token: `Bearer ${token}`
        };
    }
}
exports.RegisterService = RegisterService;
