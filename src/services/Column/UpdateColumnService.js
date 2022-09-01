"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateColumnService = void 0;
const repositories_1 = require("../../repositories");
const Socket_1 = require("../../dtos/Socket");
const Errors_1 = require("../../helpers/Errors");
exports.UpdateColumnService = {
    execute: async (io, socket, data) => {
        try {
            const _repository = (0, repositories_1.columnRepository)();
            if (!socket.user) {
                socket.emit(Socket_1.ISocketEvents.columnsUpdateFailure, "User is not authorized");
                return;
            }
            const updatedColumn = await _repository.findByIdAndUpdate(data.columnId, data.fields, { new: true });
            io.to(data.boardId).emit(Socket_1.ISocketEvents.columnsUpdateSuccess, updatedColumn);
        }
        catch (err) {
            socket.emit(Socket_1.ISocketEvents.columnsUpdateFailure, (0, Errors_1.getErrorMessage)(err));
        }
    }
};
