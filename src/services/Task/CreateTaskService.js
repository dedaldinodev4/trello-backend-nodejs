"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskService = void 0;
const repositories_1 = require("../../repositories");
const Socket_1 = require("../../dtos/Socket");
const Errors_1 = require("../../helpers/Errors");
exports.CreateTaskService = {
    execute: async (io, socket, data) => {
        try {
            const _repository = (0, repositories_1.taskRepository)();
            if (!socket.user) {
                socket.emit(Socket_1.ISocketEvents.tasksCreateFailure, "User is not authorized");
                return;
            }
            const task = new _repository({
                title: data.title,
                boardId: data.boardId,
                userId: socket.user.id,
                columnId: data.columnId
            });
            const taskSave = await task.save();
            io.to(data.boardId).emit(Socket_1.ISocketEvents.tasksCreateSuccess, taskSave);
        }
        catch (err) {
            socket.emit(Socket_1.ISocketEvents.tasksCreateFailure, (0, Errors_1.getErrorMessage)(err));
        }
    }
};
