const jwtStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;

const { Customer } = require('../models/models');

module.exports = passport => {
    passport.use(
        new jwtStrategy({
            jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET || "secret",
        }, (payload, done) => {
            Customer.findById(payload.id).then(customer => {
                if(customer) return done(null, customer);
                return done(null, false);
            }).catch(err => {
                if (proccess.env.NODE_ENV === 'development') {
                    console.log(err);
                }
            })
        })
    )
}