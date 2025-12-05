import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  specs: {
    type: [
      {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
      },
    ],
    required: true,
  }
});

const Product = mongoose.model('product', productSchema);

export default Product;
