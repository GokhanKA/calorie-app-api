const express = require('express');
const passport = require('../libs/passport');
const middlewares = require('../libs/middlewares');

const router = express.Router();
const {
	register,
	get,
	getById,
	deleteUser,
	login,
	update,
	editUser,
} = require('../controllers/users');

router.post('/users/register', register);
router.get('/users',passport.authenticate('jwt'), get);
router.get('/user/:id', passport.authenticate('jwt'), middlewares.isAdmin, getById);
router.delete('/user/:id', passport.authenticate('jwt'), middlewares.isOwner, deleteUser);
router.post('/users/login', login);
router.put('/user/password',passport.authenticate('jwt'),middlewares.isOwner, update);
router.put('/user/edituser/:id',passport.authenticate('jwt'), middlewares.isOwner, middlewares.isUserManager, editUser);

module.exports = router;
