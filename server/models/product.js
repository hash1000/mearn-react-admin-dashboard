import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  Category: String,
  rating: Number,
  supply: Number,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
