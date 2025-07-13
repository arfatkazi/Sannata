import { Router } from "express";
import { index } from "../controllers/index.controller.js";
import { arcjetProtect } from "../middlewares/arcjet.middleware.js";

const router = Router();

router.get("/", arcjetProtect, index);

export default router;
