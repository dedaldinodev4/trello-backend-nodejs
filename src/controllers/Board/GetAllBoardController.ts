import { Request, Response } from "express";
import { IExpressRequest } from '../../dtos/ExpressRequest'
import { GetAllBoardService } from "../../services";


export class GetAllBoardController {

    async handle(request: IExpressRequest, response: Response) {

        const service = new GetAllBoardService();

        
        if (!request.user) {
            return response.status(401).json({ message: 'UnAuthorized'});
        }
        const { id } = request.user;
        const result = await service.execute(id);
        
        if ( result instanceof Error) {
            response.status(400).json(result.message);
        }

        return response.json(result);
    }
}