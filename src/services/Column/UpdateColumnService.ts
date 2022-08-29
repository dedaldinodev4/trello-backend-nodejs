
import { columnRepository } from "../../repositories";
import { Server } from "socket.io";
import { ISocket, ISocketEvents } from "../../dtos/Socket";
import { getErrorMessage } from "../../helpers/Errors";


export const UpdateColumnService  = {
    execute: async (io: Server, socket: ISocket, 
        data: { 
            boardId: string, 
            columnId: string, 
            fields: {title: string } 
        }
    ) => {

        try {
            
            const _repository = columnRepository();

            if (!socket.user) {
                socket.emit(
                  ISocketEvents.columnsUpdateFailure,
                  "User is not authorized"
                );
                return;
            }
    
            const updatedColumn = await _repository.findByIdAndUpdate(
                data.columnId,
                data.fields,
                {new: true}
            );
            
            io.to(data.boardId).emit(
                ISocketEvents.columnsUpdateSuccess,
                updatedColumn
              );
        } catch(err) {
            socket.emit(ISocketEvents.columnsUpdateFailure, getErrorMessage(err));
        }
    }
}