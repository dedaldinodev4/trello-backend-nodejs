"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBoardService = void 0;
const repositories_1 = require("../../repositories");
const Socket_1 = require("../../dtos/Socket");
const Errors_1 = require("../../helpers/Errors");
exports.UpdateBoardService = {
    execute: async (io, socket, data) => {
        try {
            const _repository = (0, repositories_1.boardRepository)();
            if (!socket.user) {
                socket.emit(Socket_1.ISocketEvents.boardsUpdateFailure, "User is not authorized");
                return;
            }
            const updatedBoard = await _repository.findByIdAndUpdate(data.boardId, data.fields, { new: true });
            io.to(data.boardId).emit(Socket_1.ISocketEvents.boardsUpdateSuccess, updatedBoard);
        }
        catch (err) {
            socket.emit(Socket_1.ISocketEvents.boardsUpdateFailure, (0, Errors_1.getErrorMessage)(err));
        }
    }
};
