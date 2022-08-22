import { Router } from 'express';
import { ensuredAuthenticated, currentUser } from './middleware';
import {
    LoginController,
    RegisterController
} from './controllers'
import { 
    GetAllUserController,
    GetOneUserController,
    UpdateUserController,
    GetAllBoardController,
    GetOneBoardController,
    CreateBoardController,
    UpdateBoardController
} from './controllers'






const routes = Router();

routes.post('/api/auth/login', new LoginController().handle)
routes.post('/api/auth/register', new RegisterController().handle)

routes.get('/api/users', new GetAllUserController().handle)
routes.get('/api/users/:id', new GetOneUserController().handle)
routes.put('/api/users',ensuredAuthenticated(), new UpdateUserController().handle)
routes.get('/api/user',ensuredAuthenticated(), currentUser())

routes.get('/api/boards', ensuredAuthenticated(), new GetAllBoardController().handle)
routes.post('/api/boards', ensuredAuthenticated(), new CreateBoardController().handle)
routes.get('/api/boards/:id', ensuredAuthenticated(), new GetOneBoardController().handle)
routes.put('/api/boards/:id', ensuredAuthenticated(), new UpdateBoardController().handle)

export { routes }


