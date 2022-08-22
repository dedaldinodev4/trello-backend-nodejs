import { boardRepository } from "../../repositories";
import { IBoard, IBoardRequestUpdate } from "../../dtos/Board";

export class UpdateBoardService {

    async execute (id: string, { title }: IBoardRequestUpdate): Promise<IBoard | Error> {


        const _repository = boardRepository();

        const board = await _repository.findById(id);

        if (!board) {
            return new Error("Board doesn't exists!");
        }
        board.title = title;

        await board.save(); 

        return board
    }
}