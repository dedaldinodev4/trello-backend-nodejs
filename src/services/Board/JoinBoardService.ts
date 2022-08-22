import { IEventSocketRequest } from "../../dtos/Socket";
import { Server, Socket } from 'socket.io'
import { ISocket } from '../../dtos/Socket'

export const JoinBoardService =  {
    execute (io:Server, socket: ISocket, data: { boardId:string }) {

        console.log("server socket io join ", data.boardId)
        socket.join(data.boardId)
    }
}