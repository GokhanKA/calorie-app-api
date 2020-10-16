const bcryptjs = require('bcryptjs');
const passport = require('../libs/passport');
const {
	getUserByUsername,
	getAllUsers,
	getUserById,
	deleteUserById,
	addUser,
} = require('../dao/users');

const prepareUser = async (newUser) => {
	const salt = await bcryptjs.genSalt(10);
	const hash = await bcryptjs.hash(newUser.password, salt);
	const newUserResource = newUser;
	newUserResource.password = hash;
	return newUserResource;
};
// eslint-disable-next-line max-len
const comparePassword = async (candidatePassword, hash) => bcryptjs.compare(candidatePassword, hash);

const register = async (req, res) => {
	const { name } = req.body;
	const { username } = req.body;
	const { password } = req.body;
	const { role } = req.body;
	const { dailyCalorieLimit } = req.body;
	if (!name || !password) {
		return res.status(422).send({
			error: 'Missing username or password',
		});
	}
	try {
		const userData = await prepareUser({
			name,
			username,
			password,
			role,
			dailyCalorieLimit,
		});

		const user = await addUser(userData);
	
		return res.send({ user });
	} catch (e) {
		return res.status(422).send({
			message: 'User creation failed. Please try again after some time!',
			error: e.message,
		});
	}
};

const get = async (req, res) => {
	console.log(req.user);
	const users = await getAllUsers({});
	res.send({
		users,
		user: req.user,
	});
};

const getById = async (req, res) => {
	const { id } = req.params;
	const user = await getUserById(id);
	res.send({
		user,
	});
};

const deleteUser = async (req, res) => {
	const { id } = req.params;
	await deleteUserById(id);
	res.sendStatus(204);
};

const login = async (req, res) => {
	const { username } = req.body;
	const { password } = req.body;
	const user = await getUserByUsername(username);
	if (!user) {
		return res.status(400).send({
			error: 'Invalid username or password',
		});
	}
	const isMatch = await comparePassword(password, user.password);
	if (isMatch) {
		const payload = { id: user.id };
		const token = passport.getSignedToken(payload);
		res.send({
			token,
		});
	} else {
		return res.status(400).send({
			error: 'Invalid username or password',
		});
	}
};

const update = async (req, res) => {
	const username  = req.user.username;
	const { oldPassword } = req.body;
	const { newPassword } = req.body;
	let user = await getUserByUsername(username);
	const isMatch = await comparePassword(oldPassword, user.password);
	if (!isMatch) {
		return res.status(422).send({
			error: 'Wrong password',
		});
	}
	user.password = newPassword;
	user = await prepareUser(user);
	await user.save();
	return res.send({
		user,
	});
};
const editUser = async (req, res) => {
	const { id } = req.params;
	const { role } = req.body;
	const { dailyCalorieLimit } = req.body;
	let user = await getUserById(id);
	
	user.role = role;
	user.dailyCalorieLimit = dailyCalorieLimit;
	await user.save();
	return res.send({
		user,
	});
};
module.exports = {
	register,
	get,
	getById,
	deleteUser,
	login,
	update,
	editUser,
};
