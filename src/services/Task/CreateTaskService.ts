
import { boardRepository, userRepository, taskRepository } from "../../repositories";
import { IColumnRequest, IColumn } from "../../dtos/Column";
import { Server } from "socket.io";
import { ISocket, ISocketEvents } from "../../dtos/Socket";
import { getErrorMessage } from "../../helpers/Errors";


export const CreateTaskService  = {

    execute: async (io: Server, socket: ISocket, 
        data: { boardId: string, title: string, columnId: string}
    ) => {

        try {
            
            const _repository = taskRepository();

            if (!socket.user) {
                socket.emit(
                  ISocketEvents.tasksCreateFailure,
                  "User is not authorized"
                );
                return;
            }
    
            const task = new _repository({ 
                title: data.title,
                boardId: data.boardId,
                userId: socket.user.id,
                columnId: data.columnId
            });
    
            const taskSave = await task.save();
            
            io.to(data.boardId).emit(
                ISocketEvents.tasksCreateSuccess,
                taskSave
              );
              console.log("taskSave", taskSave);
        } catch(err) {
            socket.emit(ISocketEvents.tasksCreateFailure, getErrorMessage(err));
        }
    }
}