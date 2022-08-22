import { IEventSocketRequest } from "../../dtos/Socket";
import { Server, Socket } from 'socket.io'

export const LeaveBoardService =  {
    execute (io: Server, socket: Socket, data: { boardId: string}) {
        console.log("server socket io leave ", data.boardId)
        socket.leave(data.boardId)
    }
}