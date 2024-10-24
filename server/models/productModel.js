import mongoose from "mongoose";
import './config.js';

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    color: [
        { type: String }
    ],
    size: [
        { type: String }
    ],
    tags: { type: String, trim: true },
    stock: { type: Number },
    category: { type: String, required: true, trim: true },
    discount: { type: Number },
    status: { type: String, required: true, enum: ['Available', 'Out of Stock'] },
    shortDescription: { type: String, required: true, trim: true },
    longDescription: { type: String, required: true, trim: true },
    price1: { type: Number, required: true },
    price2: { type: Number },
    images: [
        { imageName: String, imagePath: String }
    ],
    dateAdded: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
