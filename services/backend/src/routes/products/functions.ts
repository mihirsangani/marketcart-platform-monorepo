import axios from 'axios'

export const getProductsFunction = async (pid:string|number|null = null) => {
    try {
        const url = !pid ? `https://dummyjson.com/products` : `https://dummyjson.com/products/${pid}`
        const result = await axios.get(url)
        return {status: true, data: result.data}
    } catch (e: any) {
        console.log(e);
        return {status: false, error: e.message}
    }
}