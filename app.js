const express = require('express');
const bodyParser = require('body-parser');

const catalogRouter = require('./routes/catalog');
const cartRouter = require('./routes/cart');
const ordersRouter = require('./routes/orders');

const app = express();
const { sequelize } = require('./utils/db');
const { Product } = require('./models/product');
const { User } = require('./models/user');
const { Cart } = require('./models/cart');
const { CartItem } = require('./models/cart_item');
const { Order } = require('./models/order');
const { OrderItem } = require('./models/order_item');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3500');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.use((req, res, next) => {
	User.findAll()
			.then(users => {
				req.user = users[0];
				next();
			})
			.catch(err => console.log(err));
})

app.use('/catalog', catalogRouter.routes);
app.use('/cart', cartRouter.routes);
app.use('/orders', ordersRouter.routes);

app.use((req, res, next) => {
		res.status(404).send('not found');
});


User.hasMany(Product);
User.hasMany(Order);
User.hasOne(Cart);

Product.belongsTo(User);
Product.belongsToMany(Cart, { through: CartItem});

Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem});

Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem});

sequelize
		.sync()
		.then(() => {
			return User.findAll();
		})
		.then(users => {
			const user = users[0];
			if (!user) {
				return User.create({name: "Evgeny", email: "test@t.w", role: "user"})
			}
			return user;
		})
		.then((user) => {
			return user.getCart().then(cart => {
				if (!cart) {
					return user.createCart();
				}
				return cart;
			});
		})
		.then(cart => {
			app.listen(3300);
		})
		.catch(err => console.log(err));


