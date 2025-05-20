const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

// Check if required environment variables are set
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.error('Missing required environment variables for Google OAuth:');
    if (!process.env.GOOGLE_CLIENT_ID) console.error('- GOOGLE_CLIENT_ID is not set');
    if (!process.env.GOOGLE_CLIENT_SECRET) console.error('- GOOGLE_CLIENT_SECRET is not set');
    process.exit(1);
}

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5001/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            console.log('Google profile:', profile);

            // Check if user already exists
            let user = await User.findByEmail(profile.emails[0].value);

            if (!user) {
                // Create new user if doesn't exist
                const userId = await User.createUser(
                    profile.displayName,
                    profile.emails[0].value,
                    'google-auth-' + Math.random().toString(36).slice(-8),
                    'Not specified',
                    'Not specified',
                    'other'
                );

                user = await User.findById(userId);
            }

            return done(null, user);
        } catch (error) {
            console.error('Google auth error:', error);
            return done(error, null);
        }
    }
));

module.exports = passport; 