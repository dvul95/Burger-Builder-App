import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        onion: 0,
        cheese: 0, 
        ketchup: 0,
        mustard: 0,
        mayonnaise: 0,
        meat: 0,
        
    },
    totalPrice: 3
};


const INGREDIENT_PRICES = {
    salad: 0.2,
    cheese: 0.9,
    mustard: 1.0,
    ketchup: 1.4,
    meat: 2.5,
    bacon: 1.0,
    onion: 0.5,
    mayonnaise: 1.5
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        default:
                return state;    
    }
    
};

export default reducer;