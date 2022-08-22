import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userRepository } from "../../repositories";
import { IUserRequest, IUserData, IUser } from "../../dtos/User";

import { configs } from '../../configs';


dotenv.config();

const { JWT_STRING } = configs.variables.app;

export class RegisterService {

    async execute ({ username, email, password }: IUserRequest): Promise<IUserData | Error> {


        const _repository = userRepository();

        const userExists = await _repository.findOne({ email });

        if (userExists) {
            return new Error('User already exists!');
        }


        const user = new _repository({
            username,
            email,
            password
        });

        const userSave = await user.save();

      
        const token = jwt.sign(
            {id: userSave._id, email: userSave.email},
            JWT_STRING,
            { expiresIn: "2h" }
        );
           
        return {
               
            id: user._id,
            email: user.email,
            username: user.username,
            token: `Bearer ${token}`
        }
        
    }
}