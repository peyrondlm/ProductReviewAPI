import mongoose from "mongoose";
import * as ReviewService from "../services/reviewService.js";

export async function getAll(req, res) {
  try {
    const { reviewer, category } = req.query;
    let reviews;
    if (reviewer) {
      reviews = await ReviewService.getAllReviewsByReviewer(reviewer);
    } else if (category) {
      reviews = await ReviewService.getAllReviewsByProductCategory(category);
    } else {
      reviews = await ReviewService.getAllReviews();
    }

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "Reviews not found" });
    }

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
}


export async function getById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id format' });
    }

    const review = await ReviewService.getReviewById(id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Error fetching review", error });
  }
}

export async function create(req, res) {
  try {
    const data = req.body;
    const review = await ReviewService.createReview(data);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error creating review", error });
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id format' });
    }

    const review = await ReviewService.updateReview(id, data);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error });
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id format' });
    }

    const review = await ReviewService.deleteReview(id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
}
