import { columnRepository } from "../../repositories";
import { Server } from "socket.io";
import { ISocket, ISocketEvents } from "../../dtos/Socket";
import { getErrorMessage } from "../../helpers/Errors";


export const DeleteColumnService  = {

    execute: async (io: Server, socket: ISocket, 
        data: { boardId: string; columnId: string }
    ) => {

        try {
            
            const _repository = columnRepository();

            if (!socket.user) {
                socket.emit(
                  ISocketEvents.columnsDeleteFailure,
                  "User is not authorized"
                );
                return;
            }
    
            await _repository.deleteOne({ _id: data.columnId});
            io.to(data.boardId).emit(ISocketEvents.columnsDeleteSuccess, data.columnId);
        } catch(err) {
            socket.emit(ISocketEvents.columnsDeleteFailure, getErrorMessage(err));
        }
    }
}