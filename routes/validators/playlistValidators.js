import {body} from "express-validator";

export const checkTitle = (field) => {
	return body(field)
			.not().isEmpty()
			.trim()
			.escape()
			.withMessage('incorrect_playlist_title_format')
}
