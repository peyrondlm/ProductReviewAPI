import mongoose from "mongoose";
import * as UserService from "../services/userService.js";
import bcrypt from "bcrypt";

const saltRounds = parseInt(process.env.SALT_ROUNDS)

export async function getAll(_, res) {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
}

export async function getById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id format' });
    }

    const user = await UserService.getUserById(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
}

export async function create(req, res) {
  try {
    const data = req.body;
    delete data.role;
    data.role = "user";
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword;
    const user = await UserService.createUser(data);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
}

export async function update(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id format" });
    }

    if (data.password && data.password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
      data.password = hashedPassword;
    } else {
      delete data.password;
    }

    const user = await UserService.updateUser(id, data);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user", error });
  }
}

export async function remove(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid id format' });
    }

    const user = await UserService.deleteUser(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing user" });
  }
}
