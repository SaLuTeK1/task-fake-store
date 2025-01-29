import {FC} from 'react';
import {IProduct} from "../../interfaces";
import {useNavigate} from "react-router-dom";

interface IProps {
    product: IProduct
}

const ProductCard: FC<IProps> = ({product}) => {
    const navigate = useNavigate();
    const {image, title, price, id, rating} = product

    const handleNavigate = () => {
        navigate(`/product-details/${id}`, {state: {product}});
    };

    return (
        <div onClick={handleNavigate} className={'bg-white rounded-[1rem] p-5 flex flex-col justify-between'}>
            <h3>{title}</h3>
            <img className={''} src={image} alt={title}/>
            <div>
                <p>Rate: {rating?.rate}</p>
                <p>Price: {price}$</p>
            </div>
        </div>
    );
};

export {ProductCard};