
import { boardRepository, userRepository, columnRepository } from "../../repositories";
import { IColumnRequest, IColumn } from "../../dtos/Column";
import { Server } from "socket.io";
import { ISocket, ISocketEvents } from "../../dtos/Socket";
import { getErrorMessage } from "../../helpers/Errors";


export const CreateColumnService  = {

    execute: async (io: Server, socket: ISocket, 
        data: { boardId: string, title: string}
    ) => {

        try {
            
            const _repository = columnRepository();

            if (!socket.user) {
                socket.emit(
                  ISocketEvents.columnsCreateFailure,
                  "User is not authorized"
                );
                return;
            }
    
            const column = new _repository({ 
                title: data.title,
                boardId: data.boardId,
                userId: socket.user.id,
            });
    
            const columnSave = await column.save();
            
            io.to(data.boardId).emit(
                ISocketEvents.columnsCreateSuccess,
                columnSave
              );
              console.log("columnSave", columnSave);
        } catch(err) {
            socket.emit(ISocketEvents.columnsCreateFailure, getErrorMessage(err));
        }
    }
}