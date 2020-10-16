const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'thisisthesecretkey';

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
	User.findById(jwtPayload.id, (err, user) => {
		if (err) {
			return done(err, false);
		}
		if (user) {
			return done(null, user);
		}
		return done(null, false);
	});
}));

const getSignedToken = payload => jwt.sign(payload, jwtOptions.secretOrKey);

const authenticate = () => passport.authenticate('jwt', { session: false });

module.exports = {
	getSignedToken,
	authenticate,
};