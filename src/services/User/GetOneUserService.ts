import { userRepository } from "../../repositories";
import { IUser } from "../../dtos/User";


export class GetOneUserService {

    async execute (id: string): Promise<IUser | Error> {

        const _repository = userRepository();

        const user = await _repository.findById(id);

        if (!user) {
            return new Error("User doesn't exists!");
        }

        return {
            id,
            email: user.email,
            username: user.username
        }
    }
}