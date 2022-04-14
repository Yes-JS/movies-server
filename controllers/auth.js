import { validationResult } from 'express-validator';
import { User } from "../models/user.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res, next) => {
	try {
		const email = req.body.email;
		const password = req.body.password;

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const errorCodes = errors.mapped()
			return res.status(422).send(errorCodes);
		}

		const user = await 	User.findOne({email: email});

		if(!user) {
			return res.status(401).send({
				password: {
					msg: 'incorrect_credentials'
				}
			});
		}

		const passwordMatched = await bcrypt.compare(password, user.password);

		if (passwordMatched) {
			const token = jwt.sign(
					{email: user.email, userId: user._id.toString()},
					process.env.JWT_SECRET,
					{expiresIn: '1h'},
			);
			res.send({
				loggedIn: true,
				userRole: user.role,
				token: token,
			})
		} else {
			res.status(401).send({
				password: {
					msg: 'incorrect_credentials'
				}
			});
		}
	} catch (err) {
		res.status(401).send({
			password: {
				msg: 'incorrect_credentials'
			}
		});
	}
};

export const signup = async  (req, res, next) => {
	try {
		const {email, password} = req.body;
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const errorCodes = errors.mapped()
			return res.status(422).send(errorCodes);
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = new User({
			email: email,
			password: hashedPassword,
			role: 'user',
			cart: {items: []},
		});

		await newUser.save();
		res.send();
	} catch (err) {
		next(err)
	}
};
