import express from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", authenticateToken, update);
router.delete("/:id", authenticateToken, remove);

export default router;
