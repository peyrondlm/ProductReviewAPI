import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
  reviewer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'reviewer', required: true },
},
{
    toJSON: { virtuals: true},
    toObject: { virtuals: true},
});

reviewSchema.virtual("product", {
  ref: "product",
  localField: "product_id",
  foreignField: "_id",
  justOne: true,
});

reviewSchema.virtual("reviewer", {
  ref: "reviewer",
  localField: "reviewer_id",
  foreignField: "_id",
  justOne: true,
});

reviewSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret.product_id;
    delete ret.reviewer_id;
    delete ret.id;
    return ret;
  }
});

reviewSchema.virtual("comments", {
  ref: "comment",
  localField: "_id",
  foreignField: "review_id",
});



const Review = mongoose.model('review', reviewSchema);

export default Review;
