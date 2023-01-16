const express = require("express");
const products_routes = require("./routes/product");
const connectDB = require("./db/connect");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.send("Hi, I am live.");
});

app.use("/api/products", products_routes);

const start = async () => {
	try {
		await connectDB(process.env.MONGODB_URL);
		app.listen(PORT, () => {
			console.log(`${PORT} Yes, I am connected.`);
		});
	} catch (err) {
		console.log(err);
	}
};

start();
