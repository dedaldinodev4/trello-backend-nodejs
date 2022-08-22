import { boardRepository } from "../../repositories";
import { IBoard } from '../../dtos/Board'

export class GetOneBoardService {

    async execute (id: string) {

        const _repository = boardRepository();
        const board = await _repository.findById(id);

        return board;
    }
}