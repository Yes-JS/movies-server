import {body} from "express-validator";

export const stringValidator = (field) => {
	return body(field)
			.not().isEmpty()
			.trim()
			.withMessage('incorrect_playlist_title_format')
}

export const priceValidator = (field) => {
	return body(field)
			.not().isEmpty()
			.isNumeric()
			.withMessage('incorrect_movie_price_format')
}

export const linkValidator = (field) => {
	return body(field)
			.not().isEmpty()
			.isURL()
			.withMessage('incorrect_url_format')
}
