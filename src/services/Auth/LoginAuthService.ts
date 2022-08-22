import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userRepository } from '../../repositories';
import { IUserLogin, IUserData } from '../../dtos/User';
import { configs } from '../../configs';


dotenv.config();

const { JWT_STRING } = configs.variables.app;

export class LoginService {

    async execute ({email, password}: IUserLogin): Promise<IUserData | Error> {
        const _repository = userRepository(); 

        const user = await _repository.findOne({ email }).select(
            "+password"
        );

        if (!user) {
            return new Error("User doesn't exists");
        }

        const validate = await user.validatePassword(password);

       if (validate) {

            const token = jwt.sign(
                {id: user._id, email: user.email},
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

       return new Error("User unauthorized");
    }
}