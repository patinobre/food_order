import { useContext } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';

// cria o componente Cart que renderiza os cartItems
const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
     };

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
     };

    const cartItems = (
        <ul clasName={classes[`cart-items`]}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    // retorna o HTML/JSX
    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{
                // pointer para a funçao totalAmount
                totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes[`button--alt`]} onClick={props.onClose}>Close</button>
                {
                // rederiza condicionalmente o botao order
                hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;