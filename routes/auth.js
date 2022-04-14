import express from 'express';
import {User} from "../models/user.js";
import {
	checkEmail,
	checkPassword,
} from './validators/authValidator.js';
import {
	login,
	signup,
} from '../controllers/auth.js';

const authRouter = express.Router();

authRouter.post(
		'/login',
		[
			checkEmail('email'),
		],
		login);

authRouter.post(
		'/signup',
		[
			checkEmail('email')
				.custom((value, {req}) => {
					return User.findOne({email: value})
							.then(user => {
								if (user) {
									return Promise.reject('email_already_exist');
								}
							})
				}),
			checkPassword('password'),
			checkPassword('secondPassword')
		]
		, signup);

export default authRouter;
