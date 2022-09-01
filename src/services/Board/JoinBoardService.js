"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinBoardService = void 0;
exports.JoinBoardService = {
    execute(io, socket, data) {
        console.log("server socket io join ", data.boardId);
        socket.join(data.boardId);
    }
};
