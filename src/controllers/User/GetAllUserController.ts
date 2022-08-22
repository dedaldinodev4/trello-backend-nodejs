import { Request, Response } from "express";
import { GetAllUserService } from "../../services";


export class GetAllUserController {

    async handle(request: Request, response: Response) {

        const service = new GetAllUserService();

        const result = await service.execute();

        if ( result instanceof Error) {
            response.status(400).json(result.message);
        }

        return response.json(result);
    }
}