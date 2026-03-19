import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { connectDB } from "../config/db";

export async function register(req: Request, res: Response) {
  try {
    await connectDB();
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    await connectDB();
    const { email, password } = req.body;
    console.log(email);
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Password or email is incorrect" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token, user: {
      id: user._id,
      name: user.name,
      email: user.email,
    }});
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function getProfile(req: Request, res: Response) {
  try {
    await connectDB();
    const user = await User.findById((req as any).userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}