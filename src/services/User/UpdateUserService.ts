import { userRepository } from "../../repositories";
import { IUser, IUserUpdateRequest } from "../../dtos/User";

export class UpdateUserService {

    async execute (id, {username, email }
        : IUserUpdateRequest): Promise<IUser | Error> {


        const _repository = userRepository();

        const user = await _repository.findById(id);

        if (!user) {
            return new Error("User doesn't exists!");
        }

        user.username = username;
        user.email = email;

        await user.save(); 

        return { 
            id,
            username: user.username,
            email: user.email
        };
    }
}