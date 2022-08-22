import { Request, Response } from "express";
import { UpdateBoardService } from "../../services"

export class UpdateBoardController {

    async handle(request: Request, response: Response) {

        const { id } = request.params;
        const { title } = request.body;

        const service = new UpdateBoardService();

        const result = await service.execute(id, {
            title
        });

        if ( result instanceof Error) {
            response.status(400).json(result.message);
        }

        return response.json(result);
    }
}