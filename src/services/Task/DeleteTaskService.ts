import { taskRepository } from "../../repositories";
import { Server } from "socket.io";
import { ISocket, ISocketEvents } from "../../dtos/Socket";
import { getErrorMessage } from "../../helpers/Errors";


export const DeleteTaskService  = {

    execute: async (io: Server, socket: ISocket, 
        data: { boardId: string; taskId: string }
    ) => {

        try {
            
            const _repository = taskRepository();

            if (!socket.user) {
                socket.emit(
                  ISocketEvents.tasksDeleteFailure,
                  "User is not authorized"
                );
                return;
            }
    
            await _repository.deleteOne({ _id: data.taskId});
            io.to(data.boardId).emit(ISocketEvents.tasksDeleteSuccess, data.taskId);
        } catch(err) {
            socket.emit(ISocketEvents.tasksDeleteFailure, getErrorMessage(err));
        }
    }
}