import { Request, Response } from "express";
import { GetOneBoardService } from "../../services"


export class GetOneBoardController {

    async handle(request: Request, response: Response) {

        const { id } = request.params;
        const service = new GetOneBoardService();

        const result = await service.execute(id);

        if ( result instanceof Error) {
            response.status(400).json(result.message);
        }

        return response.json(result);
    }
}