import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

// cria o componente Backdrop
const BackDrop = (props) => {

    // retorna o HTML/JSX
    return (
        <div className={classes.backdrop} onClick={props.onClose} />
    );
};

// cria o componente ModalOverlay
const ModalOverlay = (props) => {

    // retorna o HTML/JSX
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

// cria o componente Modal
const Modal = (props) => {

    // retorna o HTML/JSX
    return (
        <Fragment>
            {ReactDOM.createPortal(<BackDrop onClose={props.onClose} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,
                portalElement
            )}
        </Fragment>
    );
};

export default Modal;