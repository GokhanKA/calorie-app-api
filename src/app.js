const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path')

require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

const router = express.Router();
const mealRouter = require('./routes/meals');
const userRouter = require('./routes/users');

// The request handler must be the first middleware on the app

app.get('/error', () => {
	throw new Error('Broke!');
});

router.get('/', (req, res) => {
	res.json({ message: 'API Initialized!' });
});

app.use('/', mealRouter);
app.use('/', userRouter);

module.exports = app;
