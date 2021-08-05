// useReducer é semelhante ao useState, porém permite o gerenciamento de sates mais complexos
import { useReducer } from 'react';
import CartContext from './cart-context';


// constante que armazena o estado do objeto na função reducer
// inocialmente nao temos items nem amount
// esse valor é modificado ao serem adicionados items e valores no Cart
const defaultCartState = {
    items: [],
    totalAmount: 0
};

// constante recebe o valor da funçao reducer
// funçao reducer deve estar fora do componente por que nao deve ser executada toda vez que o componente é rea valiado
// a função reducer recebe 2 parâmetros,  um objeto que gerencia o stado e uma ação
// o estado é o ultimo estado verificado pela funçao reducer
// a açao é disparada posteriormente
// como parte da função reducer, temos que retornar um novo estado
const cartReducer = (state, action) => {
    
    //checamos se o tipo da açao equivale a ADD
    if(action.type === 'ADD') {

        // caso o tipo da açao seja ADD, podemos adicionar o item no cart
        // criamos um array para armazenar o estado vigente dos objetos
        // chamamos o metodo concat() para adicionar um novo item ao array
        // mas diferentemente do método push(), o metodo concat() retorna um novo array incluindo o item adicionado
        const updatedItems = state.items.concat(action.item);
        
        // constante que armazenda o valor atualizado
        //para isso pegamos a quantidade do antigo estado e aicionamos a expressao que retorna o preço multiplicado pela quantidade
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        
        // retornamos o novo estado do objeto
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    return defaultCartState;
};

// cria o componente CartProvider
// este é o componente que gerencia as informações do Cart
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