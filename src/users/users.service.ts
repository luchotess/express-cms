import { IUserPayload } from 'users/IUser';
import { User }         from 'users/user.model';

export function getUsers (): Promise<any[]> {
    return new Promise(resolve => {
        User.find()
            .then(users => resolve(users));
    })
}

export async function createUser (payload: IUserPayload): Promise<any[]> {
    const userCount = await User.find({username: payload.username}).countDocuments();

    if (userCount > 0) {
        return Promise.reject({
            code: 422,
            reason: 'ValidationError',
            message: 'Username already taken',
            location: 'username'
        });
    }

    const _user = await User.create({...payload, password: await User.hashPassword(payload.password)});

    return _user.serialize();
}

export async function updateUser (id: string, payload: IUserPayload): Promise<any[]> {
    if (!id) {
        return Promise.reject({
            error: "ID Required"
        })
    }

    let _user = await User.findOne({_id: id});

    if (_user) {
        if (payload.password) {
            payload.password = await User.hashPassword(payload.password);
        }

        for (let prop in payload) {
            _user[prop] = payload[prop];
        }

        return _user.save();
    }

    return Promise.reject({
        error: "User not found."
    })
}

export async function deleteUser (id: string) {
    return await User.findOneAndDelete({_id: id});
}
