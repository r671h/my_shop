import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { addAddress, deleteAddress, getAddresses } from "../controllers/addressController";


const router = Router();

router.get("/", authMiddleware, getAddresses);
router.post("/", authMiddleware, addAddress);
router.delete("/:id", authMiddleware, deleteAddress);

export default router;
