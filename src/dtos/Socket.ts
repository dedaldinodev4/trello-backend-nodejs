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
    boardsUpdate = "boards:update",
    boardsUpdateSuccess = "boards:updateSuccess",
    boardsUpdateFailure = "boards:updateFailure",
    boardsDelete = "boards:delete",
    boardsDeleteSuccess = "boards:deleteSuccess",
    boardsDeleteFailure = "boards:deleteFailure",
    columnsDelete = "columns:delete",
    columnsDeleteSuccess = "columns:deleteSuccess",
    columnsDeleteFailure = "columns:deleteFailure",
    columnsCreate = "columns:create",
    columnsCreateSuccess = "columns:createSuccess",
    columnsCreateFailure = "columns:createFailure",
    columnsUpdate = "columns:update",
    columnsUpdateSuccess = "columns:updateSuccess",
    columnsUpdateFailure = "columns:updateFailure",
    tasksCreate = "tasks:create",
    tasksCreateSuccess = "tasks:createSuccess",
    tasksCreateFailure = "tasks:createFailure",
}