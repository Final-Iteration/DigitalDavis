const passport = require('passport');
const httpStatus = require('http-status');
const User = require('mongoose').model('user');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');
const path = require('path');

const pubPath = path.join(__dirname, '../certificates/pub_rsa.pem');
const PUBLIC_KEY = fs.readFileSync(pubPath, 'utf8');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUBLIC_KEY,
  algorithm: ['RS256']
};

const Strategy = new jwtStrategy(options, (payload, done) => {
  User.findOne({ _id: payload.sub })
    .then((user) => {
      if(user){
        return done(null, user);
      }else {
        return done(null, false);
      }
    })
    .catch(err => done(err, null));
});

module.exports = (passport) => {
  passport.use(Strategy);
}
