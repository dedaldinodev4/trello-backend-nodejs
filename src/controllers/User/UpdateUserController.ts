import { Request, Response } from "express";
import { UpdateUserService } from "../../services"

export class UpdateUserController {

    async handle(request: Request, response: Response) {

        const { id } = request.params;
        const { username, email } = request.body;

        const service = new UpdateUserService();

        const result = await service.execute(id, {
            username, email
        });

        if ( result instanceof Error) {
            response.status(400).json(result.message);
        }

        return response.json(result);
    }
}