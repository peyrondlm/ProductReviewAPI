import mongoose from "mongoose";
import * as ProductService from "../services/productService.js";

export async function getAll(_, res) {
  try {
    const products = await ProductService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
}

export async function getById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id format' });
    }

    const product = await ProductService.getProductById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
}

export async function create(req, res) {
  try {
    const data = req.body;
    const product = await ProductService.createProduct(data);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id format' });
    }

    const product = await ProductService.updateProduct(id, data);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id format' });
    }

    const product = await ProductService.deleteProduct(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
}
