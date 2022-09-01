"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTaskService = void 0;
const repositories_1 = require("../../repositories");
const Socket_1 = require("../../dtos/Socket");
const Errors_1 = require("../../helpers/Errors");
exports.DeleteTaskService = {
    execute: async (io, socket, data) => {
        try {
            const _repository = (0, repositories_1.taskRepository)();
            if (!socket.user) {
                socket.emit(Socket_1.ISocketEvents.tasksDeleteFailure, "User is not authorized");
                return;
            }
            await _repository.deleteOne({ _id: data.taskId });
            io.to(data.boardId).emit(Socket_1.ISocketEvents.tasksDeleteSuccess, data.taskId);
        }
        catch (err) {
            socket.emit(Socket_1.ISocketEvents.tasksDeleteFailure, (0, Errors_1.getErrorMessage)(err));
        }
    }
};
