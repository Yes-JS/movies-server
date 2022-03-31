exports.getOrder = (req, res, next) => {
	req.user.getOrders({include: ['products']})
			// Product.findAll()
			.then(prods => res.send(prods))
			.catch(err => console.log(err));
};

exports.createOrder = (req, res, next) => {
	const user = req.user;
	user.getCart()
			.then(cart => {
				return cart.getProducts();
			})
			.then(products => {
				return req.user.createOrder()
						.then(order => {
							return order.addProducts(products.map(p => {
								p.orderItem = {
									quantity: p.cartItem.quantity,
								}
								return p;
							}))
						});
			})
			.then(result => {
				return user.getCart();
			})
			.then(cart => {
				cart.setProducts(null);
			})
			.then(result => {
				res.send(result);
			})
			.catch(err => console.log(err));
};
