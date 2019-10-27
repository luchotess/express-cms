import { checkPermissions } from 'auth/permissions.middleware';
import {
    createPageController,
    getPageController, getPageTypesController, updatePageController, updatePageTypesController
} from 'cms/controller';
import { Router }           from 'express';
import passport             from 'passport';

const jwtAuth = passport.authenticate('jwt', {session: false});

const routes = Router();

routes.get('/:page', getPageController);
routes.post('/:page', [jwtAuth, checkPermissions('admin')], createPageController);
routes.put('/:page', [jwtAuth, checkPermissions('admin')], updatePageController);

routes.get('/:page/types', getPageTypesController);
routes.put('/:page/types', [jwtAuth, checkPermissions('admin')], updatePageTypesController);

export default routes;
