import mongoose from "mongoose";
import * as ReviewerService from "../services/reviewerService.js";
import bcrypt from "bcrypt";

const saltRounds = parseInt(process.env.SALT_ROUNDS)

export async function getAll(_, res) {
  try {
    const reviewers = await ReviewerService.getAllReviewers();
    res.json(reviewers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviewers", error });
  }
}

export async function getById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id format' });
    }

    const reviewer = await ReviewerService.getReviewerById(id);

    if(!reviewer) {
      return res.status(404).json({ message: "Reviewer not found" });
    }

    res.json(reviewer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviewer", error });
  }
}

export async function create(req, res) {
  try {
    const data = req.body;
    const reviewer = await ReviewerService.createReviewer(data);
    res.status(201).json(reviewer);
  } catch (error) {
    res.status(500).json({ message: "Error creating reviewer", error });
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id format' });
    }
    const reviewer = await ReviewerService.updateReviewer(id, data);

    if (!reviewer) {
      return res.status(404).json({ message: "Reviewer not found" });
    }

    res.status(200).json(reviewer);
  } catch (error) {
    res.status(500).json({ message: "Error updating reviewer", error });
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id format' });
    }

    const reviewer = await ReviewerService.deleteReviewer(id);

    if (!reviewer) {
      return res.status(404).json({ message: "Reviewer not found" });
    }

    res.status(200).json({ message: "Reviewer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting reviewer", error });
  }
}
