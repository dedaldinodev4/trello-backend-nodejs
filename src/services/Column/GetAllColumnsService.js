"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllColumnsService = void 0;
const repositories_1 = require("../../repositories");
class GetAllColumnsService {
    async execute(boardId) {
        const _repository = (0, repositories_1.columnRepository)();
        const columns = await _repository.find({ boardId });
        return columns;
    }
}
exports.GetAllColumnsService = GetAllColumnsService;
