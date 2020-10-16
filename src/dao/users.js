const User = require('../models/User');

const addUser = async (data) => {
	const newUser = new User(data);
	await newUser.save();
	return newUser.toObject();
};

const getUserByUsername = async (username) => {
	const query = { username };
	return User.findOne(query).exec();
};

const getAllUsers = async () => User.find()
	.sort({ name: 1 })
	.exec();

const getUserById = async (id) => User.findById(id).exec();

const deleteUserById = async (id) => User.findByIdAndDelete(id).exec();

module.exports = {
	addUser,
	getUserByUsername,
	getAllUsers,
	getUserById,
	deleteUserById,
};
