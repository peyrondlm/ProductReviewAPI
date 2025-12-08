import express from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove
} from "../controllers/productController.js";
import { authenticateToken } from "../middlewares/auth.js";
import { authorizeAdmin } from "../middlewares/authorizeAdmin.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);

router.post("/", authenticateToken, authorizeAdmin, create);
router.put("/:id", authenticateToken, authorizeAdmin, update);
router.delete("/:id", authenticateToken, authorizeAdmin, remove);

export default router;
