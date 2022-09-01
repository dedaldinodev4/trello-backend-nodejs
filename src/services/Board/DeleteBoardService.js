"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteBoardService = void 0;
const repositories_1 = require("../../repositories");
const Socket_1 = require("../../dtos/Socket");
const Errors_1 = require("../../helpers/Errors");
exports.DeleteBoardService = {
    execute: async (io, socket, data) => {
        try {
            const _repository = (0, repositories_1.boardRepository)();
            if (!socket.user) {
                socket.emit(Socket_1.ISocketEvents.boardsDeleteFailure, "User is not authorized");
                return;
            }
            await _repository.deleteOne({ _id: data.boardId });
            io.to(data.boardId).emit(Socket_1.ISocketEvents.boardsDeleteSuccess);
        }
        catch (err) {
            socket.emit(Socket_1.ISocketEvents.boardsDeleteFailure, (0, Errors_1.getErrorMessage)(err));
        }
    }
};
