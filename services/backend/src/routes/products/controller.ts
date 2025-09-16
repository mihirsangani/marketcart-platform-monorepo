import {Request, Response} from 'express'
import {getProductDetailService} from "./service"

export const getProductDetailController = async (req:Request, res:Response) => {
    const result = await getProductDetailService(req)
    return res.status(200).send(result)
}