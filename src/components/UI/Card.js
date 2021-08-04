import classes from './Card.module.css';

// cria o componente Card
const Card = (props) => {

    //retorna o HTML/JSX
    return(
        <div className={classes.card}>{props.children}</div>
    );
};

export default Card;
