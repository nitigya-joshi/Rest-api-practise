require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");
const ProductData = require("./products.json");

const start = async () => {
	try {
		await connectDB(process.env.MONGODB_URL);
		// await Product.deleteMany({});
		await Product.create(ProductData);
		console.log("Sucess in productdb");
	} catch (err) {
		console.log(err);
	}
};

start();
