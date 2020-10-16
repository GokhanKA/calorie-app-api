const express = require('express');
const passport = require('../libs/passport');
const middlewares = require('../libs/middlewares');

const router = express.Router();
const {
	get,
	getById,
	getByUser,
	addMeal,
	deleteMeal,
	updateMeal,
} = require('../controllers/meals');

router.get('/meals', passport.authenticate('jwt'),middlewares.isOwner, get);
router.get('/meal/:id', passport.authenticate('jwt'),middlewares.isOwner, getById);
router.get('/meals/:user', passport.authenticate('jwt'),middlewares.isOwner, getByUser);
router.delete('/meal/:id', passport.authenticate('jwt'), middlewares.isOwner, deleteMeal);
router.post('/meals', passport.authenticate('jwt'), addMeal);
router.put('/meal/:id', passport.authenticate('jwt'),middlewares.isOwner, updateMeal);

module.exports = router;
