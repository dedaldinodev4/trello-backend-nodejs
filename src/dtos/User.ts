import { Document } from 'mongoose';

export interface User {
    email: string;
    username: string;
    password: string;
    createdAt: Date;
}

export interface IUserRequest {
    email: string;
    username: string;
    password: string;
}

export interface IUser {
    email: string;
    username: string;
    id: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserData {
    email: string;
    username: string;
    id: string;
    token: string;
}

export interface IUserUpdateRequest {
    email: string;
    username: string;
}

export interface normalizeUser {
    email: string;
    username: string;
    id: string;
    password?: string;
    token: string;
}


export interface UserDocument extends User, Document {
    validatePassword(param: string): Promise<boolean>;
}

