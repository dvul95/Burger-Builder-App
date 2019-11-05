import * as actionTypes from '../actions/actionTypes';

export const add_ingredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const remove_ingredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};