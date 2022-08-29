
import { boardRepository } from "../../repositories";
import { Server } from "socket.io";
import { ISocket, ISocketEvents } from "../../dtos/Socket";
import { getErrorMessage } from "../../helpers/Errors";


export const DeleteBoardService  = {

    execute: async (io: Server, socket: ISocket, 
        data: { boardId: string }
    ) => {

        try {
            
            const _repository = boardRepository();

            if (!socket.user) {
                socket.emit(
                  ISocketEvents.boardsDeleteFailure,
                  "User is not authorized"
                );
                return;
            }
    
            await _repository.deleteOne({ _id: data.boardId});
            io.to(data.boardId).emit( ISocketEvents.boardsDeleteSuccess);
        } catch(err) {
            socket.emit(ISocketEvents.boardsDeleteFailure, getErrorMessage(err));
        }
    }
}