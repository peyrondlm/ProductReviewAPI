import Services from "../models/productModel.js";

export async function getAllProducts() {
  return await Services.find();
}

export async function getProductById(id) {
  return await Services.findById(id);
}

export async function getProductsByCategory(category) {
  return Services.find({
    category: { $regex: new RegExp(`^${category}$`, "i") }
  });
}

export async function createProduct(data) {
  return await Services.create(data);
}

export async function updateProduct(id, data) {
  return await Services.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteProduct(id) {
  return await Services.findByIdAndDelete(id);
}
