
import { boardRepository, userRepository } from "../../repositories";
import { IBoardRequest, IBoard } from "../../dtos/Board";


export class CreateBoardService {

    async execute ({ title, userId }: IBoardRequest): Promise<IBoard | Error> {

        const _repoUser = userRepository();
        const _repository = boardRepository();

        const boardExists = await _repository.findOne({ title });
        const userExists = await _repoUser.findById(userId);
        
        if (boardExists) {
            return new Error('Board already exists!');
        }

        if (!userExists) {
            return new Error('User does not exists!');
        }


        const board = new _repository({ title, userId });

        const boardSave = await board.save();

           
        return boardSave;
    }
}