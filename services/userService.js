import Services from "../models/userModel.js";

export async function getAllUsers() {
  return await Services.find();
}

export async function getUserById(id) {
  return await Services.findById(id);
}

export async function getUserByEmail(email) {
  return await Services.findOne({ email });
}

export async function createUser(data) {
  return await Services.create(data);
}

export async function updateUser(id, data) {
  return await Services.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteUser(id) {
  return await Services.findByIdAndDelete(id);
}