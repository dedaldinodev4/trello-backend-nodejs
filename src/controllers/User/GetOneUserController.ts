import { Request, Response } from "express";
import { GetOneUserService } from "../../services"


export class GetOneUserController {

    async handle(request: Request, response: Response) {

        const { id } = request.params;
        const service = new GetOneUserService();

        const result = await service.execute(id);

        if ( result instanceof Error) {
            response.status(400).json(result.message);
        }

        return response.json(result);
    }
}