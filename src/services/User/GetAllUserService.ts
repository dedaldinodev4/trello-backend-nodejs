import { userRepository } from "../../repositories";


export class GetAllUserService {

    async execute () {

        const _repository = userRepository();
        const user = await _repository.find();

        return user;
    }
}