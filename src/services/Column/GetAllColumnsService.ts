import { columnRepository } from "../../repositories";


export class GetAllColumnsService {

    async execute (boardId: string) {

        const _repository = columnRepository();
        const columns = await _repository.find({ boardId });

        return columns;
    }
}