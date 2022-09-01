"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBoardService = void 0;
const repositories_1 = require("../../repositories");
class CreateBoardService {
    async execute({ title, userId }) {
        const _repoUser = (0, repositories_1.userRepository)();
        const _repository = (0, repositories_1.boardRepository)();
        const boardExists = await _repository.findOne({ title });
        const userExists = await _repoUser.findById(userId);
        if (boardExists) {
            return new Error('Board already exists!');
        }
        if (!userExists) {
            return new Error('User does not exists!');
        }
        const board = new _repository({ title, userId });
        const boardSave = await board.save();
        return boardSave;
    }
}
exports.CreateBoardService = CreateBoardService;
