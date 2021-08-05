import { useContext } from 'react';
import MealItemForm from './MealItemForm';
import CartContext from '../..//../store/cart-context';
import classes from './MealItem.module.css';

// cria o componente MealItem
const MealItem = (props) => {

    // acessa o metodo context do react
    const cartCtx = useContext(CartContext);


    const price = `$${props.price.toFixed(2)}`;

    // armazena o objeto que deve ser passado para a funçao onAddToCart
    // onAddToCart deve ser passado como prop do componente MealItem form
    // addToCartHandler serve como pointer para a prop onAddToCart
    const addToCartHandler = amount => {

        // chama o metodo  addItem que definimos no nosso context
        // encaminha o item  do context para o reducer que vai gerenciar os states do cart
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price
        });
    };

    //retorna o HTML/JSX
    return (
        <li className={classes.meal} >
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} id={props.id} />
            </div>
        </li>
    );
};

export default MealItem;