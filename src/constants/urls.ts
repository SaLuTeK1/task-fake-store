const baseURL = 'https://fakestoreapi.com'

const products = "/products"
const auth = '/auth/login'
const category = '/category'

const urls = {
    products: {
        base:products,
        byId:(id:number):string=>`${products}/${id}`,
        byCategory:(c:string):string=>`${category}/${c}`,
        categories:`${products}/categories`
    },
    auth:{
        base: auth
    }
}

export {baseURL, urls}