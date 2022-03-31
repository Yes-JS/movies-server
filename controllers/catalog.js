const { Product } = require('../models/product');

exports.getAllProducts = (req, res, next) => {
	req.user.getProducts()
	// Product.findAll()
			.then(prods => res.send(prods))
			.catch(err => console.log(err));
};

exports.getProductById = (req, res, next) => {
	const { productId } = req.params;
	req.user.getProducts({where: {id: productId}})
	// Product.findByPk(productId)
			.then(prods => res.send(prods))
			.catch(err => console.log(err));
};

exports.createProduct = (req, res, next) => {
	req.user.createProduct({
		title: req.body.title,
		price: req.body.price,
		description: req.body.description,
	})
			.then(product => res.send(product))
			.catch(err => console.log(err));
}

exports.editProduct = (req, res, next) => {
	Product.findByPk(req.body.id)
			.then(product => {
				product.title = req.body.title;
				product.price = req.body.price;
				product.description = req.body.description;
				return product.save();
			})
			.then(r => res.send(r))
			.catch(err => console.log(err));
}

exports.deleteProduct = (req, res, next) => {
	Product.findByPk(req.body.id)
			.then(product => product.destroy())
			.then(() => 	res.send())
			.catch(err => console.log(err));
}
