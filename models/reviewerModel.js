import mongoose from 'mongoose';

const reviewerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profile_photo: { type: String },
});

const Reviewer = mongoose.model('reviewer', reviewerSchema);

export default Reviewer;
