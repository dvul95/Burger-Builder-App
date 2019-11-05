import React, {Component} from 'react';
import Auxilary from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component{
    componentWillUpdate(){
        console.log('[OrderSummary] WillUpdate');
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey =>{
            return (<li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>);
        }
        );

        return(
            <Auxilary>
            <h3> YOUR ORDER </h3>
            <p><i> A burger with the following ingredients: </i> </p>
            <ul>
                <i>{ingredientSummary}</i>
            </ul>
            <p><strong>Total price: {this.props.price}$</strong> </p>
            <p><i> Continue to checkout? </i></p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Auxilary>
        );
    }
} 

export default OrderSummary;
