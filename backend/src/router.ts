import express from "express";
import {Auth} from "./auth";
import {AuthPassport} from "./auth_passport";
import {Controller} from "./controller";

export class ApiRouter {
    private router: express.Router = express.Router();
    private controller: Controller = new Controller();
    private auth: Auth = new Auth();
    private passport: AuthPassport = new AuthPassport();

    // Creates the routes for this router and returns a populated router object
    public getRouter(): express.Router {
        this.router.post("/feeds", this.controller.postFeed);
        this.router.post("/entries", this.controller.postEntry);
        this.router.post("/favorites", this.controller.postFavorite);

        this.router.post("/slack", this.passport.requireAuth,
            this.controller.postSlackToken.bind(this.controller));

        this.router.post("/slack/send", this.controller.postToSlack);
        this.router.post("/slack/channel", this.controller.postChannel);

        this.router.get("/feeds", this.controller.getFeeds);
        this.router.get("/entries", this.controller.getEntries);
        this.router.get("/favorites", this.controller.getFavorites);

        this.router.get("/slack", this.controller.getSlackToken);
        this.router.get("/slack/:userId", this.controller.getSlackTokenById);

        this.router.get("/refresh", this.controller.refreshFeeds);
        this.router.get("/feeds/preview/:feedUrl", this.controller.getFeedPreview);

        this.router.get("/users", this.controller.getUsers);
        this.router.get("/users/:userId", this.controller.getUser);

        this.router.delete("/feeds/:feedUrl", this.controller.deleteFeed);
        this.router.delete("/favorites/:fav", this.controller.deleteFavorite);
        this.router.delete("/entries/:entry", this.controller.deleteEntry);

        this.router.post("/register", (req: express.Request, res: express.Response) => {
            this.auth.register(req, res);
        });

        this.router.post("/login", (req: express.Request, res: express.Response) => {
            this.auth.login(req, res);
        });

        return this.router;
    }
}
