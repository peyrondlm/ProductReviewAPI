import Review from "../models/reviewModel.js";

export async function getAllReviews() {
  return await Review.find()
    .populate("product")
    .populate("reviewer");
}

export async function getAllReviewsByReviewer(reviewerName) {
  const reviews = await Review.find()
    .populate("product")
    .populate({
      path: "reviewer",
      match: { name: reviewerName },
    })
  return reviews.filter(review => review.reviewer !== null);
}

export async function getAllReviewsByProductCategory(categoryName) {
  const reviews = await Review.find()
    .populate({
      path: "product",
      match: { category: categoryName },
    })
    .populate("reviewer")
  return reviews.filter(review => review.product !== null);
}

export async function getReviewById(id) {
  const review = await Review.findById(id)
    .populate("product")
    .populate("reviewer")
    .populate(
      { path: "comments" ,
        populate: { path: "user_id", select: "name profile_photo" }
      });

    //Esto modifica user_id a user y elimina review_id de cada comentario
    review.comments = (review.comments || []).map(comment => {
    const { user_id, review_id, ...rest } = comment;
    return { ...rest, user: user_id };
  });

  return review;
}

export async function createReview(data) {
  return await Review.create(data);
}

export async function updateReview(id, data) {
  return await Review.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteReview(id) {
  return await Review.findByIdAndDelete(id);
}

