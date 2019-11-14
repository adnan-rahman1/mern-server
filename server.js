const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const app = express();

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    }, (accessToken, refreshToken, profile, cb) => console.log(profile)
));

app.get("/", (req, res) => {
    res.send({
        hello: "world"
    });
});

app.get("/auth/google", passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get(
    "/auth/google/callback", 
    passport.authenticate('google')
);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server is up and running"));