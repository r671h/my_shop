import { Router } from "express";
import { addReview, deleteReview, getReviews } from "../controllers/reviewController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/:id/reviews", getReviews);
router.post("/:id/reviews", authMiddleware, addReview);
router.delete("/:id/reviews/:reviewId", authMiddleware, deleteReview);

export default router;