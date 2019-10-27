export interface IUser {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
}

export interface IUserPayload {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}
