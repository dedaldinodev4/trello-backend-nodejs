import { Socket, Server } from "socket.io";
import { UserDocument } from "./User";


export interface IEventSocketRequest {
    io: Server;
    socket: Socket;
    data: { boardId: string }
}
export interface ISocket extends Socket {
    user?: UserDocument
}

export enum ISocketEvents {
    boardsJoin = "boards:join",
    boardsLeave = "boards:leave",
}