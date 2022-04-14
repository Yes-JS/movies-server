import mongoose from 'mongoose';
import { modelNames } from './constants.js';

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
	list: {
		movies: [{
			movieId: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: modelNames.movie
			}
		}]
	}
});

userSchema.methods.addToList = function (movie) {
	const newListItems = [...this.list.movies];
	const existedMovieIndex = this.list.movies.findIndex(m => {
		return m.movieId.toString() === movie._id.toString()
	});

	if (existedMovieIndex >= 0) {
		return Promise.resolve();
	}

	newListItems.push({
		movieId: movie._id,
	})
	this.list.movies = newListItems;
	this.save();
}

userSchema.methods.removeFromList = function(movieId) {
	const newListItems = this.list.movies.filter(movie => {
		return movie.movieId.toString() !== movieId.toString()
	});

	this.list.movies = newListItems;
	return this.save();
}

export const User = mongoose.model(modelNames.user, userSchema);
