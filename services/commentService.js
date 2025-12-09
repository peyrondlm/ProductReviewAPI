import services from '../models/commentModel.js';

export async function getCommentsByReviewId(id) {
    return await services.find({review_id: id})
        .populate("user_id", "name profile_photo");
}

export async function getCommentById(id) {
    return await services.findById(id)
        .populate("user_id", "name profile_photo");
    }

export async function createComment(data) {
    return await services.create(data);
}

export async function updateComment(id, data) {
    return await services.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteComment(id) {
    return await services.findByIdAndDelete(id);
}
