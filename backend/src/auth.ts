import express from "express";
import {AuthHelper} from "./auth_helper";
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

export class Auth {
    public register = (req: express.Request, res: express.Response) => {
        const username: string = req.body.username;
        const password: string = req.body.password;
        const query: Object = {username};
        const SALT_FACTOR: number = 2;

        const newUser: any = {
            username,
            password
        };

        req.app.locals.db.collection("users").findOne(query, (err: Error, existingUser: object) => {
            if (existingUser) {
                res.status(200).json({error: "user already exists", statusCode: 422});
            } else {
                bcrypt.genSalt(SALT_FACTOR, (someError: Error, salt: string) => {
                    if (someError) {
                        return someError;
                    }

                    bcrypt.hash(newUser.password, salt, null, (anError: Error, hash: string) => {
                        if (anError) {
                            return anError;
                        }
                        newUser.password = hash;
                        req.app.locals.db.collection("users").insertOne(newUser);
                        const token: string = this.generateToken(newUser);
                        res.status(200).json({status: "success", token: "Bearer " + token, statusCode: 200});
                    });
                });
            }
        });
    }

    public login = (reqs: express.Request, res: express.Response) => {
        var req: AuthHelper = reqs as AuthHelper;
        const username: string = req.body.username;
        const password: string = req.body.password;

        req.app.locals.db.collection("users").findOne({username}, (err: Error, user: any) => {
            if (!user) {
                return res.status(200).json({error: "username not found"});
            }

            this.checkPwValid(password, user.password, (someError: Error, valid: boolean) => {
                if (someError) {
                    return res.status(200).json({error: "error", statusCode: 500});
                }
                if (!valid) {
                    return res.status(200).json({error: "bad password", statusCode: 400});
                } else {
                    return res.status(200).json({token: "Bearer " + this.generateToken(user), statusCode: 200});
                }
            });
        });
    }

    public checkPwValid = (inputPass: string, dbPass: string, callback: (err: Error, result: boolean) => void) => {
        if (dbPass === "*") {
            callback(null, false);
            return;
        }
        bcrypt.compare(inputPass, dbPass, function (err: Error, valid: boolean) {
            if (err) {
                return callback(err, false);
            }
            callback(null, valid);
        });
    }

    public generateToken = (user: object) => {
        return jwt.sign(user, "ThisIsSomeKey",
            {
                expiresIn: 20000
            });
    }
}
