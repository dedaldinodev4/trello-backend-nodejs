
import { boardRepository } from "../../repositories";
import { Server } from "socket.io";
import { ISocket, ISocketEvents } from "../../dtos/Socket";
import { getErrorMessage } from "../../helpers/Errors";


export const UpdateBoardService  = {

    execute: async (io: Server, socket: ISocket, 
        data: { boardId: string, fields: {title: string } }
    ) => {

        try {
            
            const _repository = boardRepository();

            if (!socket.user) {
                socket.emit(
                  ISocketEvents.boardsUpdateFailure,
                  "User is not authorized"
                );
                return;
            }
    
            const updatedBoard = await _repository.findByIdAndUpdate(
                data.boardId,
                data.fields,
                {new: true}
            );
            
            io.to(data.boardId).emit(
                ISocketEvents.boardsUpdateSuccess,
                updatedBoard
              );
        } catch(err) {
            socket.emit(ISocketEvents.boardsUpdateFailure, getErrorMessage(err));
        }
    }
}