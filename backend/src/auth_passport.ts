const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const JwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "ThisIsSomeKey"
};

const JwtLogin = new JwtStrategy(JwtOptions, function (payload: Object, callback: any) {
    if (payload) {
        callback(null, payload);
    } else {
        callback(null, false);
    }
});

export class AuthPassport {
    public requireAuth = passport.authenticate("jwt", {session: false});
}

passport.use(JwtLogin);
