"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskService = void 0;
const repositories_1 = require("../../repositories");
const Socket_1 = require("../../dtos/Socket");
const Errors_1 = require("../../helpers/Errors");
exports.UpdateTaskService = {
    execute: async (io, socket, data) => {
        try {
            const _repository = (0, repositories_1.taskRepository)();
            if (!socket.user) {
                socket.emit(Socket_1.ISocketEvents.tasksUpdateFailure, "User is not authorized");
                return;
            }
            const updatedTask = await _repository.findByIdAndUpdate(data.taskId, data.fields, { new: true });
            io.to(data.boardId).emit(Socket_1.ISocketEvents.tasksUpdateSuccess, updatedTask);
        }
        catch (err) {
            socket.emit(Socket_1.ISocketEvents.tasksUpdateFailure, (0, Errors_1.getErrorMessage)(err));
        }
    }
};
