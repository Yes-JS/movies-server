import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import authRouter from './routes/auth.js';
import playlistRouter from './routes/playlist.js';
import moviesRouter from './routes/movies.js';

import { MONGODB_URI } from './utils/db.js';

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(helmet.hidePoweredBy());

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3500');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
	res.setHeader('Access-Control-Allow-Credentials', "true");
	next();
});

app.use('/auth', authRouter);
app.use('/playlist', playlistRouter);
app.use('/movies', moviesRouter);

app.use((req, res, next) => {
		res.status(404).send('not found');
});

app.use((error, req, res, next) => {
	res.status(error.status || 500).send(error.message || 'server_error');
})

mongoose.connect(MONGODB_URI)
		.then(() => {
			app.listen(process.env.APP_PORT);
		})
		.catch(err => {
			console.log(err)
		})
