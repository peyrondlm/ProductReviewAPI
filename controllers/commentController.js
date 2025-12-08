import mongoose from "mongoose";
import * as CommentService from "../services/commentService.js";

export async function getAllByReviewId(req, res) {
  try {
    const { reviewId } = req.params;
    const comments = await CommentService.getCommentsByReviewId(reviewId);
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching comments" });
  }
}

export async function getById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid comment ID" });
    }

    const comment = await CommentService.getCommentById(id);

    if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching comment" });
  }
}

export async function create(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { content, review_id } = req.body;

    const data = {
      content,
      review_id,
      user_id: req.user.id,
    };

    const comment = await CommentService.createComment(data);
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating comment" });
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id format" });
    }

    const comment = await CommentService.getCommentById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (!req.user || comment.user_id._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: not the comment owner" });
    }

    delete data.user_id;

    const updated = await CommentService.updateComment(id, data);
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating comment" });
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid id format" });
    }

    const comment = await CommentService.getCommentById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (!req.user || comment.user_id._id.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: not the comment owner" });
    }

    await CommentService.deleteComment(id);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting comment" });
  }
}
