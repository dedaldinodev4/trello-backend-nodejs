import { Request, Response } from "express";
import { RegisterService } from "../../services";

export class RegisterController {

    async handle(request: Request, response: Response) {

        const { email, username, password } = request.body;

        const service = new RegisterService();

        const result = await service.execute({email, username, password});

        if ( result instanceof Error) {
            response.status(400).json(result.message);
        }

        return response.json(result);
    }
}