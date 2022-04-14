import mongoose from 'mongoose';
import { modelNames } from './constants.js';

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	releaseDate: {
		type: String,
		required: true,
	},
	genre: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	itunesLink: {
		type: String,
		required: true,
	},
	trailerLink: {
		type: String,
		required: true,
	},
	thumbnailLink: {
		type: String,
		required: true,
	},
});

export const Movie = mongoose.model(modelNames.movie, movieSchema);
