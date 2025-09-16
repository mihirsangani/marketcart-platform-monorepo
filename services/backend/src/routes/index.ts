import { Router, Request, Response } from "express";
const router = Router()

import productSvc from "./products"

router.use("/products", productSvc)

router.use("*", (req:Request, res: Response) => {
    res.status(401).send(JSON.stringify({
        status: false,
        error: "Invalid API request found."
    }))
})

export default router;