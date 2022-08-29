import { Response } from "express";
import { IExpressRequest } from '../../dtos/ExpressRequest'
import { GetAllColumnsService } from "../../services";


export class GetAllColumnsController {

    async handle(request: IExpressRequest, response: Response) {

        const service = new GetAllColumnsService();
        
        if (!request.user) {
            return response.status(401).json({ message: 'UnAuthorized'});
        }
        const { id } = request.user;
        const { boardId } = request.params;
        const result = await service.execute(boardId);
        
        if ( result instanceof Error) {
            response.status(400).json(result.message);
        }

        return response.json(result);
    }
}