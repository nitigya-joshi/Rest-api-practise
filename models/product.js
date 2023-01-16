const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	price: {
		type: Number,
		required: [true, "Price must be provided."],
	},

	featured: {
		type: Boolean,
		default: false,
	},

	rating: {
		type: Number,
		default: 5.0,
	},

	createdAt: {
		type: Date,
		default: Date.now(),
	},

	company: {
		type: String,
		enum: {
			values: ["samsung", "Google", "Oppo", "Vivo", "apple", "dell", "mi"],
			message: `This brand {VALUE} is not supported.`,
		},
	},
});

module.exports = mongoose.model("Product", productSchema);
