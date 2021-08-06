import { useContext } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';

// cria o componente Cart que renderiza os cartItems
const Cart = (props) => {
    
    // armazena as infos do cartContext
    const cartCtx = useContext(CartContext);

    // acessa o totalAmount do cartContext atraves do cartCtx e define 2 casas decimais através do toFixed(2)
    // essa informaçao é inserida num template literal `` para adicionar o dollar sign $
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    // verifica se o cartCtz não está vazio
    const hasItems = cartCtx.items.length > 0;

    // funçao que remove items do cart vai ser passada ao componente cartItem com pointer dentro da props onRemove
    const cartItemRemoveHandler = id => { };

    // funçao que adiciona items ao cart e vai ser passada ao componente cartItem com pointer dentro da props onAdd
    const cartItemAddHandler = item => { };

    const cartItems = (
        <ul clasName={classes[`cart-items`]}>
            {
            // rederiza os items do cartContext através do cartCtx
            cartCtx.items.map((item) => (
                // chama o componente CartItem e passa as props
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={
                        // usamos o metodo bind para assegurar que o id do item a ser removido foi passado
                        cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={
                        // usamos o metodo bind para assegurar que todo o  item foi passado
                        cartItemAddHandler.bind(null, item)}
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