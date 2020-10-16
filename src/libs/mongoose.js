const mongoose = require('mongoose');
const { asyncForEach } = require('./async');

const connectDB = (url) => {
	mongoose
		.connect(url || process.env.MONGODB_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})
		.then(() => {
			mongoose.Promise = global.Promise;
			// eslint-disable-next-line no-console
			console.log('Veritabanına bağlantı başarılı');
			return mongoose.connection;
		})
		.catch((err) => {
			console.error('App starting error:', err.stack); // eslint-disable-line
			process.exit(1);
		});
};

const loadDB = async (data) => {
	await asyncForEach(Object.keys(data), async (col) => {
		const collection = await mongoose.connection.collection(col);
		await collection.insert(data[col]);
	});
};

const clearDB = async () => {
	const { collections } = mongoose.connection;
	await asyncForEach(Object.values(collections), async (collection) => {
		await collection.remove();
	});
};

module.exports = {
	connectDB,
	clearDB,
	loadDB,
};
