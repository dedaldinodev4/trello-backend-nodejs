"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetOneBoardService = void 0;
const repositories_1 = require("../../repositories");
class GetOneBoardService {
    async execute(id) {
        const _repository = (0, repositories_1.boardRepository)();
        const board = await _repository.findById(id);
        return board;
    }
}
exports.GetOneBoardService = GetOneBoardService;
