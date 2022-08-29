import { taskRepository } from "../../repositories";


export class GetAllTasksService {

    async execute (boardId: string) {

        const _repository = taskRepository();
        const tasks = await _repository.find({ boardId });

        return tasks;
    }
}