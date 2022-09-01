"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllBoardService = void 0;
const repositories_1 = require("../../repositories");
class GetAllBoardService {
    async execute(id) {
        const _repository = (0, repositories_1.boardRepository)();
        const boards = await _repository.find({ userId: id });
        return boards;
    }
}
exports.GetAllBoardService = GetAllBoardService;
