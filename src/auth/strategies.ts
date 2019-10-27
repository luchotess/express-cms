import { CONFIG }                              from 'config';
import LocalStrategy                           from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User }                                from 'users/user.model';

export const localStrategy = new LocalStrategy(async (username, password, callback) => {
    const _user = await User.findOne({username: username});

    if (!_user) {
        return Promise.reject({
            reason : 'LoginError',
            message: 'Incorrect username or password'
        });
    }

    const isPasswordValid = await _user.validatePassword(password);

    if (!isPasswordValid) {
       return callback(null, false, {
            reason : 'LoginError',
            message: 'Incorrect username or password'
        });
    }
    return callback(null, _user);
});

export const jwtStrategy = new JwtStrategy(
    {
        secretOrKey   : CONFIG.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        algorithms    : ['HS256']
    },
    (payload, done) => {
        done(null, payload.user);
    }
);
