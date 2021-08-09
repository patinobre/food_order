import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    if(action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id
        );
        
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItem; 
        let updatedItems; 

        if (existingCartItem) {
            updatedItem = {
              ...existingCartItem,
              amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItem = { ...action.item };
            updatedItems = state.items.concat(updatedItem);
        }

        
       
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    return defaultCartState;
};

const CartProvider = (props) => {
    
    // constante que armazena a funçao reducer
    // passamos como elemento do array para armazenar state o cartSate 
    // passamos como elemento do array para armazenar açao o dispatchCartAction
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    // quando essa função é chamada, obtemos o item que deve ser adicionado ao Cart
    // precisamos checar se o item já está no carrinho ou se é um novo item
    // na açao dispatch encaminhamos o item que deve ser adicionado para a função reducer
    const addItemToCartHandler = (item) => {
        
        //açao que dispara a açao de adicionar items no cart
        dispatchCartAction({type: 'ADD', item: item});
    };
    
    // quando essa função é chamada, obtemos o item que deve ser removido do Cart
   const removeItemFromCartHandler = (id) => {
        
        //açao que dispara a açao de remover items no cart
        dispatchCartAction({type: 'REMOVE', id: id});
    };
    
    // o cartState é usado para construir o objeto cartContext
    // usamos a porpriedade items e a porpriedade totalAmount para aceesar as propriedades do cartState
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    };

    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;