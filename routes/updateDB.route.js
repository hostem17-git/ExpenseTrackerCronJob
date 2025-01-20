import { Router } from "express";
import { updateDatabase } from "../controllers/category.controller";

const router = Router();

router.get("/", updateDatabase);

export default router;