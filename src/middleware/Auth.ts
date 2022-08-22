import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import { configs } from "../configs";
import { userRepository } from "../repositories";
import { IExpressRequest } from '../dtos/ExpressRequest';
import { normalizeUser } from "../dtos/User";

const { JWT_STRING } = configs.variables.app;

export const ensuredAuthenticated = () => {

    return async (
        request: IExpressRequest,
        response: Response,
        next: NextFunction
    ) => {

        try {
            const authHeader = request.headers.authorization;

            if (!authHeader) {
                return response.status(401).json({ error: 'Token is missing'});
            }

            const _repository = userRepository();

            const [, token] = authHeader.split(" ");
            const data = jwt.verify(token, JWT_STRING);
            const user = await _repository.findById(data.id);
            
            if (!user) {
                return response.status(401).json({ error: 'Token is invalid.'});
            }

            request.user = user;
            next();
        } catch(err) {
            return response.status(401).json({ error: err})
        }
    }
}

export const currentUser = () => {
    return async (request: IExpressRequest, response: Response) => {
    if (!request.user) {
      return response.sendStatus(401);
    }
    const { user } = request;
    const token = jwt.sign(
        {id: user._id, email: user.email},
       JWT_STRING,
        { expiresIn: "2h" }
    );
        
    const userCurrent = {
        id: user._id,
        email: user.email,
        username: user.username,
        token
    }
    response.send(userCurrent);
  };
}

