import { Movie } from '../models/movie.js';
import {validationResult} from "express-validator";

export const createMovie = async (req, res, next) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const errorCodes = errors.mapped()
			return res.status(422).send(errorCodes);
		}

		const movieToSave = new Movie({
					title: req.body.title,
					releaseDate: req.body.releaseDate,
					genre: req.body.genre,
					description: req.body.description,
					price: req.body.price,
					itunesLink: req.body.itunesLink,
					trailerLink: req.body.trailerLink,
					thumbnailLink: req.body.thumbnailLink,
				}
		);

		const newMovie = await 	movieToSave.save();
		res.status(201).send(newMovie)
	} catch (err) {
		next(err)
	}
};

export const getMovies = async (req, res, next) => {
	try {
		const movies = await Movie.find();
		res.send(movies)
	} catch (err) {
		next(err)
	}
}
