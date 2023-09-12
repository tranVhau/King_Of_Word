const { Accounts } = require("../models");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const currAcc = await Accounts.findOne({ googleId: profile.id });
        if (currAcc) {
          // if exist, update the photo if something changed...
          currAcc.photo = profile.photos[0].value;
          await currAcc.save();
          // console.log("currAcc", currAcc);
          cb(null, currAcc);
        } else {
          const acc = new Accounts({
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value,
            googleId: profile.id,
            balance: 200,
          });
          const newAcc = await acc.save();
          // console.log("newAcc", newAcc);
          cb(null, newAcc);
        }
      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.serializeUser((acc, done) => {
  done(null, acc.id);
});

passport.deserializeUser((id, done) => {
  Accounts.findById(id).then((acc) => {
    done(null, acc);
  });
});
