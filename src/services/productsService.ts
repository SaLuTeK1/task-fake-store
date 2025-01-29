import {apiService} from "./apiService";
import {urls} from "../constants";
import {IRes} from "../types";
import {IProduct} from "../interfaces";

const productsService = {
    getAll:():IRes<IProduct[]>=>apiService.get(urls.products.base),
    getById:(id:number):IRes<IProduct>=>apiService.get(urls.products.byId(id)),
    getAllCategories:():IRes<string[]>=>apiService.get(urls.products.categories)
}

export {productsService}