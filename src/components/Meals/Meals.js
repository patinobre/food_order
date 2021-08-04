import { Fragment } from 'react';
import MealsSummary from './MealsSummary';
import AvailableMeals from './AvailableMeals';

// cria o componente Meals
const Meals = () => {

    //retorna o HTML/JSX
    return(
        <Fragment>
            <MealsSummary />
            <AvailableMeals />
        </Fragment>        
    );    
};

export default Meals;