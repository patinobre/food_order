import classes from './Input.module.css';

// cria o componente Input
const Input = (props) => {

    //retorna o código HTML/JSX
    return(
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input {...props.input} />
        </div>
    );
};

export default Input;