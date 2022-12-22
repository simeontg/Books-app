import { Router } from "express";
import { getAllComments } from "../controllers/commentController.js";
const router = Router()

router.get('/', getAllComments)

export default router