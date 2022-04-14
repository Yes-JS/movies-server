export default function(req, res, next) {
	if (req.user.role !== 'admin') {
		return res.status(403).send({
			permissions: {
				msg: 'permissions_error',
			}
		})
	}
	next();
}
