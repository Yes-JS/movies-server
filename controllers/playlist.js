import { Movie } from "../models/movie.js";

export const getList = async (req, res, next) => {
	try {
		const user = await req.user.populate('list.movies.movieId');
		const movies = user.list.movies.map(m => {
			return {
				...m.movieId?._doc,
			}
		});
		res.send(movies);
	} catch (err) {
		next(err)
	}
};

export const addToList = async (req, res, next) => {
	try {
		const { id } = req.body;
		const movie = await Movie.findById(id);
		await req.user.addToList(movie);
		const user = await req.user.populate('list.movies.movieId');
		const playlist =  user.list.movies.map(m => {
			return {
				...m.movieId?._doc,
			}
		});
		res.send(playlist)
	} catch(err) {
		next(err)
	}
};

export const removeFromList = async (req, res, next) => {
	try {
		const { id } = req.body;
		await req.user.removeFromList(id);
		const user = await req.user.populate('list.movies.movieId');
		const playlist = user.list.movies.map(m => {
			return {
				...m.movieId?._doc,
			}
		});
		res.send(playlist)
	} catch (err) {
		next(err)
	}
};
