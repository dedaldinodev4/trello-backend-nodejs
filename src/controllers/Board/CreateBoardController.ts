import { Request, Response } from "express";
import { IExpressRequest } from '../../dtos/ExpressRequest'
import { CreateBoardService } from "../../services";

export class CreateBoardController {

    async handle(request: IExpressRequest, response: Response) {

        const { title } = request.body;

        if (!request.user) {
            return response.status(401).json({ message: 'UnAuthorized'});
        }
        const userId  = request.user?.id;

        const service = new CreateBoardService();

        const result = await service.execute({ title, userId });

        if ( result instanceof Error) {
            response.status(400).json(result.message);
        }

        return response.json(result);
    }
}