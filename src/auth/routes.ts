import { CONFIG } from 'config';
import { Router } from 'express';
import jwt        from 'jsonwebtoken';
import passport   from 'passport';

const routes = Router();
const localAuth = passport.authenticate('local', {session: false});

const createAuthToken = function (user) {
    return jwt.sign({user}, CONFIG.JWT_SECRET, {
        subject  : user.username,
        expiresIn: CONFIG.JWT_EXPIRY,
        algorithm: 'HS256'
    });
};

routes.post('/login', localAuth, (req: any, res: any) => {
    const authToken = createAuthToken(req.user.serialize());
    res.json({authToken});
});

export default routes;
