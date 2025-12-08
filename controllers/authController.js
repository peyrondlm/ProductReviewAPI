import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as UserService from "../services/userService.js";

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRATION = process.env.JWT_EXPIRATION;

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await UserService.getUserByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const payload = { id: user._id.toString(), email: user.email, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

    res.json({ token, user: { id: payload.id, email: payload.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login error" });
  }
}
