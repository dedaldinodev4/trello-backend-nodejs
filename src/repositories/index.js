"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRepository = exports.columnRepository = exports.boardRepository = exports.userRepository = void 0;
const User_1 = __importDefault(require("../entities/User"));
const Board_1 = __importDefault(require("../entities/Board"));
const Column_1 = __importDefault(require("../entities/Column"));
const Task_1 = __importDefault(require("../entities/Task"));
const userRepository = () => {
    return User_1.default;
};
exports.userRepository = userRepository;
const boardRepository = () => {
    return Board_1.default;
};
exports.boardRepository = boardRepository;
const columnRepository = () => {
    return Column_1.default;
};
exports.columnRepository = columnRepository;
const taskRepository = () => {
    return Task_1.default;
};
exports.taskRepository = taskRepository;
