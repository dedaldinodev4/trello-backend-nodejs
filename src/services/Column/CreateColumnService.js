"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateColumnService = void 0;
const repositories_1 = require("../../repositories");
const Socket_1 = require("../../dtos/Socket");
const Errors_1 = require("../../helpers/Errors");
exports.CreateColumnService = {
    execute: async (io, socket, data) => {
        try {
            const _repository = (0, repositories_1.columnRepository)();
            if (!socket.user) {
                socket.emit(Socket_1.ISocketEvents.columnsCreateFailure, "User is not authorized");
                return;
            }
            const column = new _repository({
                title: data.title,
                boardId: data.boardId,
                userId: socket.user.id,
            });
            const columnSave = await column.save();
            io.to(data.boardId).emit(Socket_1.ISocketEvents.columnsCreateSuccess, columnSave);
        }
        catch (err) {
            socket.emit(Socket_1.ISocketEvents.columnsCreateFailure, (0, Errors_1.getErrorMessage)(err));
        }
    }
};
