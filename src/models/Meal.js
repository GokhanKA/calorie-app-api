const mongoose = require('mongoose');
const User = require('./User');
const autoIncrement = require('mongoose-auto-increment');

const { Schema } = mongoose;
 
autoIncrement.initialize(mongoose.connection);

const MealSchema = new Schema({
	user: { type: Number, ref: User },
	date: String,
	time: String,
	text: String,
	numOfCalories: Number,
});

MealSchema.plugin(autoIncrement.plugin, 'Meal');
const Meal = mongoose.model('Meal', MealSchema);

module.exports = Meal;
