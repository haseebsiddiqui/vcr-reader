import {Request} from "express";

export interface AuthHelper extends Request {
    user: object;
}

export class User extends Object {
    _id: string;
}
