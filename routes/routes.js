import express from "express";

import reviewRoutes from "./reviewRoutes.js";
import reviewerRoutes from "./reviewerRoutes.js";
import productRoutes from "./productRoutes.js";
import commentRoutes from "./commentRoutes.js";
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/reviews", reviewRoutes);
router.use("/reviewers", reviewerRoutes);
router.use("/comments", commentRoutes);
router.use("/products", productRoutes);
router.use("/users", userRoutes);

export default router;