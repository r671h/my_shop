import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoute from "./routes/authRoute";
import addressRoute from "./routes/addressRoute";
import cartRoute from "./routes/cartRoute";
import orderRoute from "./routes/orderRoute";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*",
  credentials: true,
}));
app.use(express.json());

app.use("/api/cart", cartRoute);
app.use("/api/auth", authRoute);
app.use("/api/addresses", addressRoute);
app.use("/api/orders", orderRoute)

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});