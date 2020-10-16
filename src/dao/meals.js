const Meal = require('../models/Meal');

const getAllMeals = async () => Meal.find()
	.sort({ date: -1 })
	.exec();

const getMealById = async (id) => Meal.findById(id).exec();

const getMealByUser = async (user) => Meal.find({ user })
	.sort({ date: -1 })
	.exec();

const createMeal = async (data) => {
	const newMeal = new Meal(data);
	await newMeal.save();
	return newMeal.toObject();
};

const deleteMealById = async (id) => Meal.findByIdAndDelete(id).exec();

module.exports = {
	getAllMeals,
	getMealById,
	getMealByUser,
	createMeal,
	deleteMealById,
};
