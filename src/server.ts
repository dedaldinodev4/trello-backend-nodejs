import express from 'express';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
import { routes } from './routes';


const server = express()
const httpServer = createServer(server) 
const ioServer = new Server(httpServer, {
    cors: {
        origin: "*",
        credentials: true,
        allowedHeaders:"*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    }
})


server.use(cors());
server.use(express.urlencoded({ extended: true}));
server.use(express.json())
server.use(express.json());
server.use(morgan('dev')); 

mongoose.set("toJSON", {
    virtuals: true,
    transform: (_, converted) => {
        delete converted._id;
    },
});

server.use(routes);



export {
    ioServer,
    httpServer
}
