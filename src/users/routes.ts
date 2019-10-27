import { Router } from 'express';
import {
    getUsersController,
    createUsersController,
    updateUsersController,
    deleteUsersController
}                 from 'users/controller';

const routes = Router();

routes.get('', getUsersController);
routes.post('', createUsersController);
routes.put('/:id', updateUsersController);
routes.delete('/:id', deleteUsersController);

export default routes;
