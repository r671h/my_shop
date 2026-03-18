import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoute";
import addressRoute from "./routes/addressRoute";
import cartRoute from "./routes/cartRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/cart", cartRoute)
app.use("/api/auth", authRoutes);
app.use("/api/addresses", addressRoute);

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});