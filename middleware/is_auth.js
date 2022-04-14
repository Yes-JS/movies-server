import jwt from "jsonwebtoken";
import { User } from '../models/user.js';

export default function(req, res, next) {
	const authHeader = req.get('Authorization');

	if (!authHeader) {
		return res.status(401).send({
			permissions: {
				msg: 'not_authorized',
			}
		})
	}

	const token = authHeader.split(' ')[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, 'somesecretstring');
	} catch (err) {
		return res.status(401).send({
			permissions: {
				msg: 'not_authorized',
			}
		})
	}

	if (!decodedToken) {
		return res.status(401).send({
			permissions: {
				msg: 'not_authorized',
			}
		})
	}

	User.findById(decodedToken.userId)
			.then(user => {
				if (!user) {
					return next();
				}
				req.user = user;
				next();
			})
			.catch(err => next(err));
}
