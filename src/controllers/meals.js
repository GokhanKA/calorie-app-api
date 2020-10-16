const moment = require('moment');
const {
	getAllMeals,
	getMealById,
	getMealByUser,
	createMeal,
	deleteMealById,
} = require('../dao/meals');

const get = async (req, res) => {
	const meals = await getAllMeals({});
	res.send({
		meals,
	});
};

const getByUser = async (req, res) => {
	const meals = await getMealByUser(Number(req.params.user));
	res.send({
		meals,
	});
};

const getById = async (req, res) => {
	const meal = await getMealById(req.params.id);
	res.send({
		meal,
	});
};

const addMeal = async (req, res) => {
	try {
		const actualDate = moment().format('DD-MM-YYYY');
		const actualTime = moment().format('HH:mm');
		const {
			date,
			time,
			text,
			numOfCalories,
		} = req.body;
		const meal = await createMeal({
			user: req.user._id,
			date: date || actualDate,
			time: time || actualTime,
			text,
			numOfCalories,
		});

		return res.send({
			meal,
		});
	} catch (e) {
		return res.status(422).send({
			message: 'Meal creation failed. Please try again after some time!',
			error: e.mesage,
		});
	}
};

const deleteMeal = async (req, res) => {
	const { id } = req.params;
	await deleteMealById(id);
	res.sendStatus(204);
};

const updateMeal = async (req, res) => {
	try {
		const meal = await getMealById(req.params.id);
		meal.date = req.body.date;
		meal.time = req.body.time;
		meal.text = req.body.text;
		meal.numOfCalories = req.body.numOfCalories;
		const updatedMeal = await meal.save();
		res.send({ meal: updatedMeal });
	} catch (e) {
		res.status(500).send({
			error: 'Unknown error occured on while updating meal',
		});
		throw e;
	}
};

module.exports = {
	get,
	getById,
	getByUser,
	addMeal,
	deleteMeal,
	updateMeal,
};
