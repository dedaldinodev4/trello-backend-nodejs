"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteColumnService = void 0;
const repositories_1 = require("../../repositories");
const Socket_1 = require("../../dtos/Socket");
const Errors_1 = require("../../helpers/Errors");
exports.DeleteColumnService = {
    execute: async (io, socket, data) => {
        try {
            const _repository = (0, repositories_1.columnRepository)();
            if (!socket.user) {
                socket.emit(Socket_1.ISocketEvents.columnsDeleteFailure, "User is not authorized");
                return;
            }
            await _repository.deleteOne({ _id: data.columnId });
            io.to(data.boardId).emit(Socket_1.ISocketEvents.columnsDeleteSuccess, data.columnId);
        }
        catch (err) {
            socket.emit(Socket_1.ISocketEvents.columnsDeleteFailure, (0, Errors_1.getErrorMessage)(err));
        }
    }
};
