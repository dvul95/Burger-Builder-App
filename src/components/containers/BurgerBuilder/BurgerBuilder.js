import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../../components/Burger/Burger';
import BuildControls from '../../../components/Burger/BuildControls/BuildControls';
import Modal from '../../../components/UI/Modal/Modal';
import OrderSummary from '../../../components/Burger/OrderSummary/OrderSummary';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';
import * as burgerBuilderActions from '../../../store/actions/index';

// const INGREDIENT_PRICES = {
//     salad: 0.2,
//     cheese: 0.9,
//     mustard: 1.0,
//     ketchup: 1.4,
//     meat: 2.5,
//     bacon: 1.0
// }

class BurgerBuilder extends Component {


    state = {
        // ingredients:{ //
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     mustard: 0,
        //     ketchup: 0, 
        //     meat: 0
        // },
        //totalPrice: 3,
        // purchasable: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    // addIngredientHandler=(type) => {
    //     const oldCount = this.props.ings[type]; 
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition =INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHander = (type) =>{
    //     const oldCount = this.props.ings[type]; 
    //     if(oldCount <= 0){
    //         return; 
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.props.ings
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction =INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: newPrice, ings: updatedIngredients });
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');

        //    const queryParams = [];
        //    for(let i in this.props.ings){
        //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]
        //             ));
        //    }
        //         queryParams.push('price=' + this.state.totalPrice)
        //    const queryString = queryParams.join('&');

        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        } 
        let orderSummary = <OrderSummary
            ingredients={this.props.ings}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.price.toFixed(2)}
        />
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Auxilary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                <Burger ingredients={this.props.ings} />

                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    price={this.props.price}

                />
            </Auxilary>

        );

    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.add_ingredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.remove_ingredient(ingName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));