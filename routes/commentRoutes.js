import express from "express";
import {
    getAllByReviewId,
    getById,
    create,
    update,
    remove
} from "../controllers/commentController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/review/:reviewId", getAllByReviewId);
router.get("/:id", getById);

router.post("/", authenticateToken, create);
router.put("/:id", authenticateToken, update);
router.delete("/:id", authenticateToken, remove);

export default router;