import Modal from '../UI/Modal';
import classes from './Cart.module.css';

// cria o componente Cart
const Cart = (props) => {
    const cartItems = (
        <ul clasName={classes[`cart-items`]}>
            {[{ id: 'c1', name: 'Sushi', amount: 2, price: 12.99 }].map((item) => (
                <li>{item.name}</li>
            ))}
        </ul>
    );

    // retorna o HTML/JSX
    return (
        <Modal>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>35.62</span>
            </div>
            <div className={classes.actions}>
                <button className={classes[`button--alt`]}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
};

export default Cart;