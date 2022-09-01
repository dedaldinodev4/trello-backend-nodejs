import mongoose from "mongoose";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import { userRepository } from './repositories'
import { ioServer, httpServer } from "./server";
import { configs } from './configs'
import { ISocketEvents } from './dtos/Socket';
import { 
    LeaveBoardService, 
    JoinBoardService, 
    CreateColumnService,
    CreateTaskService,
    UpdateBoardService,
    DeleteBoardService,
    UpdateColumnService,
    DeleteColumnService,
    UpdateTaskService,
    DeleteTaskService
 } from './services';
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
        socket.on(ISocketEvents.boardsJoin, (data) => {
            JoinBoardService.execute(ioServer, socket, data)
        })
                
        socket.on(ISocketEvents.boardsLeave, (data) => {
            LeaveBoardService.execute(ioServer, socket, data)
        });

        socket.on(ISocketEvents.columnsCreate, data => {
            CreateColumnService.execute(ioServer, socket, data)
        })

        socket.on(ISocketEvents.tasksCreate, data => {
            CreateTaskService.execute(ioServer, socket, data)
        })

        socket.on(ISocketEvents.boardsUpdate, data => {
            UpdateBoardService.execute(ioServer, socket, data)
        })

        socket.on(ISocketEvents.boardsDelete, data => {
            DeleteBoardService.execute(ioServer, socket, data)
        })

        socket.on(ISocketEvents.columnsUpdate, data => {
            UpdateColumnService.execute(ioServer, socket, data)
        })

        socket.on(ISocketEvents.columnsDelete, data => {
            DeleteColumnService.execute(ioServer, socket, data)
        })

        socket.on(ISocketEvents.tasksUpdate, data => {
            UpdateTaskService.execute(ioServer, socket, data)
        })

        socket.on(ISocketEvents.tasksDelete, data => {
            console.log('Event task deleted')
            DeleteTaskService.execute(ioServer, socket, data)
        })
    })
        

mongoose.connect(`${MONGO_STRING}${MONGO_DB}`)
    .then(res => console.log('Database connected.'))
    .catch(err => console.log(err));

httpServer.listen(APP_PORT, () => {
    console.log(`Api is listening on port ${APP_PORT}`);    
})

   
