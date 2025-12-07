import Reviewer from "../models/reviewerModel.js";

export async function getAllReviewers() {
  return await Reviewer.find();
}

export async function getReviewerById(id) {
  return await Reviewer.findById(id);
}

export async function createReviewer(data) {
  return await Reviewer.create(data);
}

export async function updateReviewer(id, data) {
  return await Reviewer.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteReviewer(id) {
  return await Reviewer.findByIdAndDelete(id);
}
