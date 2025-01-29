import {FC, useEffect, useState} from 'react';
import {IProduct} from "../interfaces";
import {ProductCard} from "../components/ProductCard/ProductCard";

interface IProps {

}

const SavedProductsPage: FC<IProps> = () => {
    const [products, setProducts] = useState<IProduct[]>([])
    useEffect(() => {
        setProducts(
            JSON.parse(localStorage.getItem('favourites')))
    }, []);

    if (products.length === 0){
        return (
            <h2>
               Loading...
            </h2>
        )
    }

    return (
        <div className={' grid grid-cols-5 gap-5'}>
            {products && products.map(product=><ProductCard key={product.id} product={product}/>)}
        </div>
    );
};

export {SavedProductsPage};