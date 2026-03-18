import { authMiddleware } from "../middleware/authMiddleware";
import { addToCart, getCart, removeFromCart, clearCart, updateQuantity } from "../controllers/cartController";
import e, { Router } from "express";

const router = Router();

router.get("/", authMiddleware, getCart);
router.post("/", authMiddleware, addToCart);
router.delete("/clear", authMiddleware, clearCart);
router.delete("/:productId", authMiddleware, removeFromCart);
router.put("/:productId", authMiddleware, updateQuantity);

export default router;