const { Product } = require('../models/product');

exports.getCart = (req, res, next) => {
	req.user.getCart()
			.then(cart => cart.getProducts())
			.then(products => res.send(products))
			.catch(err => console.log(err))
};

exports.addToCart = (req, res, next) => {
	const { id } = req.body;
	let fetchedCart;
	let newQuantity = 1;
	req.user.getCart()
			.then(cart => {
				fetchedCart = cart;
				return cart.getProducts({where: {id: id}});
			})
			.then(products => {
				let product;
				if (products.length > 0) {
					product = products[0];
				}

				if (product) {
					const oldQty = product.cartItem.quantity;
					newQuantity = oldQty + 1;
					return product;
				}
				return Product.findByPk(id)
			})
			.then(prod => {
				return fetchedCart.addProduct(prod, {through: {quantity: newQuantity}})
			})
			.then(() => {
				return fetchedCart.getProducts();
			})
			.then(products => {
				res.send(products);
			})
			.catch(err => console.log(err))
};

exports.deleteFromCart = (req, res, next) => {
	const { id } = req.body;
	req.user.getCart()
			.then(cart => {
				return cart.getProducts({where: {id: id}});
			})
			.then(prods => {
				const product = prods[0];
				return product.cartItem.destroy();
			})
			.then(r => {
				return req.user.getCart()
			})
			.then(cart => {
				return cart.getProducts();
			})
			.then(products => {
				res.send(products);
			})
			.catch(err => console.log(err))
}

exports.decreaseCartItemQuantity = (req, res, next) => {
	const user = req.user;
	const { id } = req.body;
	let fetchedCart;
	user.getCart()
			.then(cart => {
				fetchedCart = cart;
				return cart.getProducts({where: {id: id}});
			})
			.then(prods => {
				const product = prods[0]
				product.cartItem.quantity--;
				product.cartItem.save();
			})
			.then(r => {
				return user.getCart()
			})
			.then(cart => {
				return cart.getProducts();
			})
			.then(products => {
				res.send(products);
			})
}
