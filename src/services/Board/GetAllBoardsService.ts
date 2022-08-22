import { boardRepository } from "../../repositories";


export class GetAllBoardService {

    async execute (id: string) {

        const _repository = boardRepository();
        const boards = await _repository.find({ userId: id });

        return boards;
    }
}