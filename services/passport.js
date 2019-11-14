const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user/User');

require('dotenv').config();


passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    }, async (accessToken, refreshToken, profile, cb) => {
        try { 
            const isUserExist = await User.findOne({ googleId: profile.id });
            if(isUserExist) {
                console.log('hell');
                cb(null, isUserExist);
            }
            else {
                const newUser = await new User({ googleId: profile.id });
                await newUser.save();
                cb(null, newUser);
            }
        }
        catch(err) {
            cb(err);
        }
    }
));