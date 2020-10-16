const app = require('./app');
const { connectDB } = require('./libs/mongoose');

const port = process.env.API_PORT || 8081;
app.listen(port, () => {
	console.log(`api running on port ${port}`); // eslint-disable-line
	connectDB();
});
