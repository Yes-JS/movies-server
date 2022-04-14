import {body, check} from "express-validator";

export const checkEmail = (field) => {
	return check(field)
			.isEmail()
			.withMessage('incorrect_email_format')
			.normalizeEmail()
}

export const checkPassword = (field) => {
	return body('password', 'password_validation_error')
			.isLength({min: 8})
			.isAlphanumeric()
			.trim()
}
