import { IUserPayload }         from 'users/IUser';
import { createUser, getUsers, updateUser, deleteUser } from 'users/users.service';

export async function getUsersController (req, res) {
    const users = await getUsers();
    res.json(users);
}

export async function createUsersController (req, res) {
    const userPayload: IUserPayload = req.body;
    const _user = await createUser(userPayload);
    res.status(201).json(_user);
}

export async function updateUsersController (req, res) {
    const userPayload: IUserPayload = req.body;
    const _user: any = await updateUser(req.params.id, userPayload);
    res.status(200).json(_user.serialize());
}

export async function deleteUsersController (req, res) {
    const newUser = await deleteUser(req.params.id);
    res.status(200).json(newUser);
}
