import { useRef, useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

//cria o componente MealItemForm
// é daqui que chamamos a constante addItemToCartHandler que está no componente CartProvider
const MealItemForm = (props) => {
    
    // useState é usado para controlar quando o formulário é válido ou não
    // inicialmente o state é true
    // extraimos os valores de useState atraves do array com 2 elementos, uma constante que armazena o state e uma funçao que manipula o novo state
    const [amountIsValid, setAmountIsValid] = useState(true);
    
    // usamos refs no componente Input para extrair o amount que foi imputado
    // no componente input, passamos o ref para a prop ref
    // mas como é um componente customizado, precisamos ir até o compunente customizado input e importar o react
    // e ter a funçao do componente através do React.forwardRef
    // e passar como parametro da funcao React.forwardRef props e ref
    // precisamos também setar a prop ref no <input ref ={ref}>
    // só assim podemos ter acesso ao input atraves de refs
    // e ler o valor imputado na função submitHandler
    const amountInputRef = useRef();
    
    // dessa função obtemos o evento que é passado como parametro pelo onSubmite que fica no form
    const submitHandler = event => {
        // chamamos o event.preventDefault para evitar que o browser automaticamente recarregue a página
        event.preventDefault();
        
        // enteredAmount armazena o valor imputado usando ref
        // como padrao o valor é uma string
        const enteredAmount = amountInputRef.current.value;
        
        // força o valor a se tornar numero
        const enteredAmountNumber = +enteredAmount;

        // validações
        // verifica se nenhum texto foi imputado ou se o número é menor que 1 ou maior que 5
        if (
            enteredAmount.trim().length === 0 || 
            enteredAmountNumber < 1 || 
            enteredAmountNumber > 5
        ) {
            // define o setAmountIsValid como false ao encontrar alguma das condiçoes acima
            setAmountIsValid(false);
            
            // se alguma das condiçoes acima forem encontradas, o processamento da função é parado
            // podemos adicionar uma mensagem de erro e para isso temos que manipular o state usando o useState
            return;
        }

        // passa através de props uma função para adicionar um item ao cart
        // poderia ser feito  chamando o metodo context, mas como é uma situaçao de gerenciamento simples, pode ser feita por props
        // essa função vai ser definida no componente MealItem
        props.onAddToCart(enteredAmountNumber);
    };

    // retorna o HTML e o JSX se o conteudo impputado passou pels validaçoes acima
    return(
        <form className={classes.form} onSubmit={submitHandler} >
            <Input 
                ref={amountInputRef}
                label="Amount" 
                input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }}
            />
            <button>+ Add</button>
            {
            // conteudo renderizado condicionalmente
            ! amountIsValid && <p>Please enter a valid amount (1-5).</p> }
        </form>
    );
};

export default MealItemForm;