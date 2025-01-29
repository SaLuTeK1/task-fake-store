import {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks";
import {productsActions} from "../store/slices/productsSlice";
import {ProductCard} from "../components/ProductCard/ProductCard";

interface IProps {
}

const HomePage: FC<IProps> = () => {
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState<number>(1000);
    const [minRating, setMinRating] = useState<number>(0);

    const dispatch = useAppDispatch();
    const {products, selectedCategories, searchProducts, searchTrigger} = useAppSelector(state => state.products);

    useEffect(() => {
        dispatch(productsActions.getAll());
    }, [dispatch]);

    const filteredProducts = products.filter(product => {
        const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const isPriceInRange = product.price >= minPrice && product.price <= maxPrice;
        const isInRateRange = product?.rating?.rate >= minRating
        return isCategoryMatch && isPriceInRange && isInRateRange;
    });

    const [currentPage, setCurrentPage] = useState<number>(1);
    const productsPerPage = 10;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const productsToDisplay = searchProducts.length > 0
        ? searchProducts
            .filter(product => product.price >= minPrice && product.price <= maxPrice)
            .filter(product => product.rating.rate >= minRating)
            .slice(indexOfFirstProduct, indexOfLastProduct)
        : filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (products.length === 0) {
        return <h2>Loading...</h2>;
    }
    console.log(searchProducts);
    if (searchTrigger && searchProducts.length === 0){
        return <h2>Nothing found</h2>
    }

    return (
        <div>
            <div className={'flex justify-between'}>
                <div className="price-filter flex gap-2 mb-5">
                    <input
                        type="number"
                        value={minPrice}
                        onChange={e => setMinPrice(Number(e.target.value) || 0)}
                        placeholder="Min Price"
                        className="px-2 py-1 border rounded"
                    />
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={e => setMaxPrice(Number(e.target.value) || 1000)}
                        placeholder="Max Price"
                        className="px-2 py-1 border rounded"
                    />
                </div>
                <div className={'flex items-center gap-5'}>
                    <h2>Rating: </h2>
                    <input
                        type={'number'}
                        min={0} max={5} step={.1}
                        value={minRating}
                        onChange={e=>setMinRating(+e.target.value)}
                    />
                </div>
            </div>
            <div className={'grid grid-cols-5 gap-5'}>
                {productsToDisplay.length > 0
                    ? productsToDisplay.map(product => <ProductCard key={product.id} product={product}/>)
                    : <p>No products found within this price range.</p>
                }
            </div>
            <div className="pagination mt-5 flex justify-center gap-3">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage * productsPerPage >= filteredProducts.length}
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export {HomePage};
