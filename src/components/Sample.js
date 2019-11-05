import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
//import { ReactComponent } from '*.svg';

class Sample extends Component{
    render(){
        return(
            <div>
                <h2> Hello, {this.props.name} !</h2>
                <h3> {this.props.bd}</h3>
                <h3>Your User Id is: {this.props.uId}</h3>
            </div>
        )
    }
}

export default Sample;
