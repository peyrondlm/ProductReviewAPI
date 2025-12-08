import express from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../controllers/reviewerController.js";
import { authenticateToken } from "../middlewares/auth.js";
import { authorizeAdmin } from "../middlewares/authorizeAdmin.js";

const router = express.Router();

router.get("/", authenticateToken, authorizeAdmin, getAll);
router.get("/:id", authenticateToken, authorizeAdmin, getById);
router.post("/", authenticateToken, authorizeAdmin, create);
router.put("/:id", authenticateToken, authorizeAdmin, update);
router.delete("/:id", authenticateToken, authorizeAdmin, remove);

export default router;
