import {Request} from 'express'
import { getProductsFunction } from './functions'

export const getProductDetailService = async (req: Request) => {
    try {
        const productId = req?.params?.id || null
        const result: any = await getProductsFunction(productId)
        return result
    }catch (e:any) {
        console.log(e);
        return {status: false, error: e.message}
    }
}