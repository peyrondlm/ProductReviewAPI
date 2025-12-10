import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";

import Product from "../models/productModel.js";
import Reviewer from "../models/reviewerModel.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env");
  process.exit(1);
}

async function insertData() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conectado a MongoDB");

    const folderPath = path.join(process.cwd(), "data");
    const files = fs.readdirSync(folderPath);
    const jsonFiles = files.filter(f => f.endsWith(".json"));

    for (const file of jsonFiles) {
      const filePath = path.join(folderPath, file);
      const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

      console.log(`\nInsertando ${file} ...`);

      if (file === "reviewers.json") {
        await Reviewer.insertMany(data);
        console.log(`Reviewers insertados: ${data.length}`);
      } else {
        await Product.insertMany(data);
        console.log(`Productos insertados: ${data.length}`);
      }
    }

    console.log("\nDatos insertados correctamente");
    process.exit();
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

insertData();
