"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveBoardService = void 0;
exports.LeaveBoardService = {
    execute(io, socket, data) {
        console.log("server socket io leave ", data.boardId);
        socket.leave(data.boardId);
    }
};
