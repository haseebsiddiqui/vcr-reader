import express from "express";
import {ObjectID} from "mongodb";
import axios from "axios";
import {AuthHelper, User} from "./auth_helper";
import Parser from "rss-parser";

const parser = new Parser();

export class Controller {
    public postFeed(req: express.Request, res: express.Response): void {
        const doc = req.body;

        req.app.locals.db.collection("feeds").insertOne(doc, function (err: any, response: any) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.json(response.ops[0]);
            }
        });
    }

    public postEntry(req: express.Request, res: express.Response): void {
        const doc = req.body;

        req.app.locals.db.collection("entries").insertOne(doc, function (err: any, response: any) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.json(response.ops[0]);
            }
        });
    }

    public postFavorite(req: express.Request, res: express.Response): void {
        const doc = req.body;

        req.app.locals.db.collection("favorites").insertOne(doc, function (err: any, response: any) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.json(response.ops[0]);
            }
        });
    }

    public postSlackToken(req: express.Request, res: express.Response): void {
        const myToken = req.body;
        var req2: AuthHelper = req as AuthHelper;
        const user: User = req2.user as User;
        const doc = {slackToken: myToken, userId: new ObjectID(user._id)};

        req.app.locals.db.collection("slack").insertOne(doc, function (err: any, response: any) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.json(response.ops[0]);
            }
        });
    }

    public postToSlack(req: express.Request, res: express.Response): void {
        const doc = req.body;
        const sToken = doc['token'];
        delete doc['token'];
        delete doc['_id'];
        const initialItem = JSON.stringify(doc, null, 2);
        const itemToSend = initialItem.replace(/<\/?[^>]+(>|$)/g, "");

        req.app.locals.db.collection("channels")
            .find({}, {limit: 1}).sort({$natural: -1}).toArray()
            .then((channel) => {
                    run(channel).catch((runErr) => console.log(runErr));
                }
            );

        async function run(channel: any) {
            const url = 'https://slack.com/api/chat.postMessage';
            const finalChannel = channel[0]['channelId'];

            const thingToPost = await axios.post(url, {
                    channel: finalChannel,
                    text: itemToSend
                },
                {
                    headers: {authorization: `Bearer ${sToken}`}
                }
            );
        }

        res.sendStatus(200);
    }

    public postChannel(req: express.Request, res: express.Response): void {
        const doc = req.body;

        req.app.locals.db.collection("channels").insertOne(doc, function (err: any, response: any) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.json(response.ops[0]);
            }
        });
    }

    public getFeeds(req: express.Request, res: express.Response): void {
        req.app.locals.db.collection("feeds").find().toArray(function (err: any, results: any) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(results);
            }
        });
    }

    public getEntries(req: express.Request, res: express.Response): void {
        req.app.locals.db.collection("entries").find().sort({isoDate: -1}).toArray(
            function (err: any, results: any) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.send(results);
                }
            }
        );
    } // todo possible to ensure unique index is always created on entries in MongoDB?

    public getFavorites(req: express.Request, res: express.Response): void {
        req.app.locals.db.collection("favorites").find().toArray(function (err: any, results: any) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.send(results);
            }
        });
    }

    public getSlackToken(req: express.Request, res: express.Response): void {
        req.app.locals.db.collection("slack").find().toArray(function (err: any, results: any) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.json(results);
            }
        });
    }

    public getSlackTokenById(req: express.Request, res: express.Response): void {
        const tempId = new ObjectID(req.params.userId);

        req.app.locals.db.collection("slack").find({userId: tempId}, {limit: 1}).sort({$natural: -1})
            .toArray(function (err: any, results: any) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.json(results);
                }
            });
    }

    public refreshFeeds(req: express.Request, res: express.Response): void {
        req.app.locals.db.collection("feeds").find().toArray(function (err: any, data: any) {
            if (err) {
                res.sendStatus(500);
            } else {
                data.forEach((val: { [x: string]: any; }, i: any) => {
                    (async () => {
                        const currentUrl = val['feedurl'];

                        await parser.parseURL(currentUrl).then((feedArray) => {
                            const newArr1 = feedArray.items.map((v) => ({...v, sourceURL: currentUrl}));

                            req.app.locals.db.collection("entries").
                            insertMany(newArr1, function (err: any, response: any) {});
                        });
                    })();
                });
            }
        });
        res.sendStatus(200);
    }

    public getFeedPreview(req: express.Request, res: express.Response): void {
        (async () => {
            const feedToPreview = req.params.feedUrl;
            const feed = await parser.parseURL(feedToPreview);
            res.send(feed);
        })().catch((error) => {
            res.sendStatus(500);
        });
    }

    public deleteFeed(req: express.Request, res: express.Response): void {
        const finalID = new ObjectID(req.params.feedUrl);

        req.app.locals.db.collection("feeds").deleteOne({_id: finalID},
            function (err: any, response: any) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.json(response.result);
                }
            });
    }

    public deleteEntry(req: express.Request, res: express.Response): void {
        const finalID = new ObjectID(req.params.entry);

        req.app.locals.db.collection("entries").deleteOne({_id: finalID},
            function (err: any, response: any) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.json(response.result);
                }
            });
    }

    public deleteFavorite(req: express.Request, res: express.Response): void {
        req.app.locals.db.collection("favorites").deleteOne({_id: req.params.fav},
            function (err: any, response: any) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.json(response.result);
                }
            });
    }

    public getUsers(req: express.Request, res: express.Response): void {
        req.app.locals.db.collection("users").find().toArray(function (err: any, results: any) {
            if (err) {
                res.sendStatus(500);
            } else {
                res.json(results);
            }
        });
    }

    public getUser(req: express.Request, res: express.Response): void {
        const idToFind = new ObjectID(req.params.userId);

        req.app.locals.db.collection("users").findOne({_id: idToFind},
            function (err: any, result: any) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.json(result);
                }
            });
    }
}
