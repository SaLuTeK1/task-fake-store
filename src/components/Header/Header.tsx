import {ChangeEvent, FC, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {CategoriesList} from "../CategoriesList/CategoriesList";
import {IProduct} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {productsActions} from "../../store/slices/productsSlice";

interface IProps {

}

const Header: FC<IProps> = () => {
    const [token, setToken] = useState<string | null>(null)
    const [trigger, setTrigger] = useState<boolean>()

    const [searchQuery, setSearchQuery] = useState<string>("");

    const {products} = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();

    const filteredProducts = products.filter((product: IProduct) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        dispatch(productsActions.setSearchTrigger(searchQuery))
        dispatch(productsActions.setSearchedProducts(filteredProducts))
    }, [searchQuery]);


    useEffect(() => {
        setToken(localStorage.getItem('token'))
    }, [trigger]);

    const logout = () => {
        localStorage.removeItem('token')
        setTrigger(prevState => !prevState)
    }

    return (
        <header className={'bg-blue-400 p-5 mb-8'}>
            <div className={'wrapper flex justify-between'}>
                <nav>
                    <Link className={'text-white font-medium text-3xl'} to={'/'}>ShopTD</Link>
                </nav>
                <div className={'flex items-center gap-5'}>
                    <CategoriesList/>
                    <input type="text"
                           value={searchQuery}
                           onChange={handleSearchChange}
                           placeholder={'Search'}/>
                </div>
                <nav className={'flex items-center gap-6'}>
                    {token ?
                        <p onClick={logout}
                           className={'text-white font-medium text-3xl transition hover:text-blue-200 cursor-pointer'}>LogOut</p>
                        :
                        <Link className={'text-white font-medium text-3xl transition hover:text-blue-200'}
                              to={'/login'}>Log-In</Link>
                    }
                    <Link to={'/favourites'}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="40px" height="40px">
                            <path
                                d="M 13 2 C 12.447 2 12 2.448 12 3 L 12 47 C 12 47.358 12.190953 47.689187 12.501953 47.867188 C 12.812953 48.045187 13.194906 48.043281 13.503906 47.863281 L 25 41.158203 L 36.496094 47.863281 C 36.651094 47.954281 36.826 48 37 48 C 37.172 48 37.344047 47.956187 37.498047 47.867188 C 37.809047 47.689188 38 47.358 38 47 L 38 33.167969 L 36 34.447266 L 36 45.259766 L 25.503906 39.136719 C 25.348906 39.045719 25.174 39 25 39 C 24.826 39 24.651094 39.045719 24.496094 39.136719 L 14 45.259766 L 14 4 L 36 4 L 36 13.205078 L 36.345703 12.298828 L 36.648438 11.996094 C 36.868437 11.776094 37.348953 11.365187 38.001953 11.117188 L 38.001953 3 C 38.001953 2.448 37.554953 2 37.001953 2 L 13 2 z M 39.0625 12.910156 C 38.6625 12.910156 38.2625 13.210156 38.0625 13.410156 L 35.662109 19.710938 L 28.962891 20.111328 C 28.562891 20.111328 28.1625 20.410547 28.0625 20.810547 C 27.9625 21.210547 28.062891 21.710156 28.462891 21.910156 L 33.5625 26.111328 L 31.861328 32.611328 C 31.761328 33.011328 31.961719 33.510937 32.261719 33.710938 C 32.461719 33.810938 32.661328 33.910156 32.861328 33.910156 C 33.062328 33.910156 33.263891 33.810938 33.462891 33.710938 L 39.0625 30.111328 L 44.662109 33.810547 C 44.962109 34.110547 45.461719 34.010547 45.761719 33.810547 C 46.161719 33.510547 46.262109 33.110937 46.162109 32.710938 L 44.462891 26.210938 L 49.662109 22.011719 C 49.962109 21.711719 50.062891 21.310156 49.962891 20.910156 C 49.862891 20.510156 49.4625 20.210938 49.0625 20.210938 L 42.361328 19.810547 L 39.962891 13.511719 C 39.862891 13.211719 39.4625 12.910156 39.0625 12.910156 z M 39.0625 16.710938 L 40.662109 21.210938 C 40.862109 21.510937 41.1625 21.810547 41.5625 21.810547 L 46.363281 22.111328 L 42.662109 25.111328 C 42.362109 25.311328 42.263281 25.711328 42.363281 26.111328 L 43.5625 30.710938 L 39.5625 28.111328 C 39.4625 28.011328 39.2625 27.910156 39.0625 27.910156 C 38.8615 27.910156 38.662891 28.011719 38.462891 28.011719 L 34.462891 30.611328 L 35.662109 26.011719 C 35.762109 25.711719 35.663281 25.211719 35.363281 25.011719 L 31.662109 22.011719 L 36.462891 21.810547 C 36.862891 21.710547 37.163281 21.511328 37.363281 21.111328 L 39.0625 16.710938 z"/>
                        </svg>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export {Header};