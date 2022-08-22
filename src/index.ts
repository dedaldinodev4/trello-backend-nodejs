import mongoose from "mongoose";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import { userRepository } from './repositories'
import { ioServer, httpServer } from "./server";
import { configs } from './configs'
import { ISocketEvents } from './dtos/Socket';
import { LeaveBoardService, JoinBoardService } from './services';
import { ISocket } from './dtos/Socket'


dotenv.config();

const { APP_PORT, JWT_STRING } = configs.variables.app;
const { MONGO_STRING, 
        MONGO_DB } = configs.variables.mongo;

ioServer
    .use(async (socket: ISocket, next) => {
        try {

            const tokenString = (socket.handshake.auth.token as string)
            
            if(!tokenString) {
                return next(new Error("Authentication error, Token a missing"));
            }

            const _repository = userRepository();

            const [, token] = tokenString.split(" ")
            const data = jwt.verify(token, JWT_STRING);

            const user = await _repository.findById(data.id);

            if (!user) {
                return next(new Error("Authentication error"));
            }
            socket.user = user;
            next();

        } catch(err) {
            return next(new Error("Authentication error catch"));
        }
    })
    .on("connection", (socket) => {
       console.log('Connected socket')
        socket.on(ISocketEvents.boardsJoin, (data) => {
            JoinBoardService.execute(ioServer, socket, data)
        })
                
        socket.on(ISocketEvents.boardsLeave, (data) => {
            LeaveBoardService.execute(ioServer, socket, data)
        });
    })
        

mongoose.connect(`${MONGO_STRING}`)
    .then(res => console.log('Database connected.'))
    .catch(err => console.log(err));

httpServer.listen(APP_PORT, () => {
    console.log(`Api is listening on port ${APP_PORT}`);    
})

   
