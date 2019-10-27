import { checkPermissions } from 'auth/permissions.middleware';
import {
    createPageController,
    getPageController, getPageTypesController, updatePageController, updatePageTypesController, uploadPageController
}                           from 'cms/controller';
import crypto               from "crypto";
import { Router }           from 'express';
import passport             from 'passport';
import path                 from "path";
import multer from 'multer';

const jwtAuth = passport.authenticate('jwt', {session: false});

const routes = Router();


export function asyncHandler(handler) {
    return function (req, res, next) {
        if (!handler) {
            next(new Error(`Invalid handler ${handler}, it must be a function.`));
        } else {
            handler(req, res, next).catch(next);
        }
    };
}


const storage = multer.diskStorage({
    destination: './files',
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

routes.get('/:page', getPageController);
routes.post('/:page', [jwtAuth, checkPermissions('admin')], createPageController);
routes.put('/:page', [jwtAuth, checkPermissions('admin')], updatePageController);
routes.post('/:page/upload', multer({ storage: storage }).single('photo'), uploadPageController);

routes.get('/:page/types', getPageTypesController);
routes.put('/:page/types', [jwtAuth, checkPermissions('admin')], asyncHandler(updatePageTypesController));

export default routes;
