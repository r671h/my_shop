import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { addOrder, deleteOrder, getOrders } from "../controllers/ordersController";


const router = Router();

router.get("/", authMiddleware, getOrders);
router.post("/", authMiddleware, addOrder);
router.delete("/:id", authMiddleware, deleteOrder);

export default router;
