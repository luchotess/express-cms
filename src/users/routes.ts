import { checkPermissions } from 'auth/permissions.middleware';
import { Router }           from 'express';
import passport             from 'passport';

import {
    getUsersController,
    createUsersController,
    updateUsersController,
    deleteUsersController
} from 'users/controller';

const routes = Router();

const jwtAuth = passport.authenticate('jwt', {session: false});

routes.get('', [jwtAuth, checkPermissions('admin')], getUsersController);
routes.post('', [jwtAuth, checkPermissions('admin')], createUsersController);
routes.put('/:id', [jwtAuth, checkPermissions('admin')], updateUsersController);
routes.delete('/:id', [jwtAuth, checkPermissions('admin')], deleteUsersController);

export default routes;
