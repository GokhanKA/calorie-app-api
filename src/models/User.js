const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const { Schema } = mongoose;

autoIncrement.initialize(mongoose.connection);

const UserSchema = new Schema({
	name: String,
	username: {
		type: String,
		unique: true,
	},
	password: String,
	role: String,
	dailyCalorieLimit: String,
});

UserSchema.plugin(autoIncrement.plugin, 'User');
const User = mongoose.model('User', UserSchema);

module.exports = User;
