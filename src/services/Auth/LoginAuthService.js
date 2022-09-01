"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const repositories_1 = require("../../repositories");
const configs_1 = require("../../configs");
dotenv_1.default.config();
const { JWT_STRING } = configs_1.configs.variables.app;
class LoginService {
    async execute({ email, password }) {
        const _repository = (0, repositories_1.userRepository)();
        const user = await _repository.findOne({ email }).select("+password");
        if (!user) {
            return new Error("User doesn't exists");
        }
        const validate = await user.validatePassword(password);
        if (validate) {
            const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, JWT_STRING, { expiresIn: "2h" });
            return {
                id: user._id,
                email: user.email,
                username: user.username,
                token: `Bearer ${token}`
            };
        }
        return new Error("User unauthorized");
    }
}
exports.LoginService = LoginService;
