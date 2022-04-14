import express from 'express';
import {
	createMovie,
	getMovies,
} from '../controllers/movies.js';
import {
	stringValidator,
	priceValidator,
	linkValidator,
} from './validators/movieValidator.js';
import isAuth from '../middleware/is_auth.js';
import isAdmin from '../middleware/is_admin.js';

const moviesRouter = express.Router();

moviesRouter.get('/', getMovies);

moviesRouter.post(
		'/',
		[
			stringValidator('title'),
			stringValidator('releaseDate'),
			stringValidator('genre'),
			stringValidator('description'),
			priceValidator('price'),
			linkValidator('itunesLink'),
			linkValidator('trailerLink'),
			linkValidator('thumbnailLink'),
			isAuth,
			isAdmin,
		],
		createMovie,
);

// moviesRouter.post('/edit-playlist', isAuth, isAdmin, editProduct);

// moviesRouter.post('/delete-playlist', isAuth, isAdmin, deleteProduct);

// moviesRouter.get('/playlists/:productId', getProductById);

export default moviesRouter;
