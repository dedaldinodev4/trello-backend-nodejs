
import { taskRepository } from "../../repositories";
import { Server } from "socket.io";
import { ISocket, ISocketEvents } from "../../dtos/Socket";
import { getErrorMessage } from "../../helpers/Errors";


export const UpdateTaskService  = {
    execute: async (io: Server, socket: ISocket, 
        data: { 
            boardId: string, 
            taskId: string, 
            fields: {
                title?: string, 
                description?: string, 
                columnId?: string 
            } 
        }
    ) => {

        try {
            
            const _repository = taskRepository();

            if (!socket.user) {
                socket.emit(
                  ISocketEvents.tasksUpdateFailure,
                  "User is not authorized"
                );
                return;
            }
    
            const updatedTask = await _repository.findByIdAndUpdate(
                data.taskId,
                data.fields,
                {new: true}
            );
            
            io.to(data.boardId).emit(
                ISocketEvents.tasksUpdateSuccess,
                updatedTask
              );
        } catch(err) {
            socket.emit(ISocketEvents.tasksUpdateFailure, getErrorMessage(err));
        }
    }
}