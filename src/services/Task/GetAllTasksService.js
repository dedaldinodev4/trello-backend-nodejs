"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllTasksService = void 0;
const repositories_1 = require("../../repositories");
class GetAllTasksService {
    async execute(boardId) {
        const _repository = (0, repositories_1.taskRepository)();
        const tasks = await _repository.find({ boardId });
        return tasks;
    }
}
exports.GetAllTasksService = GetAllTasksService;
