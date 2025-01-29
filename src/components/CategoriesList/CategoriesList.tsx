import {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {productsActions} from "../../store/slices/productsSlice";
// @ts-ignore
import css from './CategoryList.module.css'

interface IProps {}

const CategoriesList: FC<IProps> = () => {
    const dispatch = useAppDispatch();
    const { categories , selectedCategories} = useAppSelector(state => state.products);

    const handleCategorySelect = (category: string) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((cat) => cat !== category)
            : [...selectedCategories, category];

        dispatch(productsActions.setSelectedCategories(updatedCategories));
    };


    useEffect(() => {
        dispatch(productsActions.getAllCategories())
    }, [dispatch]);


    return (
        <div className={css.dropdown}>
            <h2 className="cursor-pointer group">Categories</h2>
            <div className={css.dropdownContent}>
                {categories.map((category) => (
                    <label key={category} className="block px-4 py-2">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategorySelect(category)}
                            className="mr-2"
                        />
                        {category}
                    </label>
                ))}
            </div>
        </div>
    );
};

export { CategoriesList };
