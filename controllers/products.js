const Products = require("../models/product");

const getAllProducts = async (req, res) => {
	const { company, name, featured, sort, select, p, l } = req.query;
	const queryObject = {};

	if (company) queryObject.company = company;
	if (featured) queryObject.featured = featured;
	if (name) queryObject.name = { $regex: name, $options: "i" };

	let apiData = Products.find(queryObject);

	let page = Number(req.query.p) || 1;
	let limit = Number(req.query.l) || 2;
	let skip = (page - 1) * limit;

	apiData = apiData.skip(skip).limit(limit);

	if (sort) {
		let sortFix = sort.replace(",", " ");
		apiData = apiData.sort(sortFix);
	}

	if (select) {
		let selectFix = select.split(",").join(" ");
		apiData = apiData.select(selectFix);
	}

	const products = await apiData;
	res.status(200).json({ products, nbHits: products.length });
};

const getAllProductsTesting = async (req, res) => {
	const products = await Products.find(req.query).select("name");
	res.status(200).json({ products });
};

module.exports = { getAllProducts, getAllProductsTesting };
