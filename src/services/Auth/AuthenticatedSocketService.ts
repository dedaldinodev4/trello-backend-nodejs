import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { ISocket } from "../../dtos/Socket";
import { configs } from '../../configs';
import { userRepository } from '../../repositories'


dotenv.config();

const { JWT_STRING } = configs.variables.app;

export const AuthenticatedSocketService = {
    async execute (socket: ISocket, next) {
        try {
            const token = (socket.handshake.auth.token as string)
            const data = jwt.verify(token.split(" ")[1], JWT_STRING);

            const user = await userRepository.findById(data.id);

            if (!user) {
                return next(new Error("Authentication error"));
            }
            socket.user = user;
            next();

        } catch(err) {
            return next(new Error("Authentication error"));
        }
    }
}