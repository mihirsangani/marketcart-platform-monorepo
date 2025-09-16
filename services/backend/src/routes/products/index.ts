import { Router } from "express";
const router = Router();

import {getProductDetailController} from "./controller";

// Get all products
router.get("/", getProductDetailController);

// Get one product
router.get("/:id", getProductDetailController);

export default router;
