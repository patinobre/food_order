import React from 'react';
import classes from './Input.module.css';

// cria o componente Input
const Input = React.forwardRef((props, ref) => {

    //retorna o código HTML/JSX
    return(
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} {...props.input} />
        </div>
    );
});

export default Input;