import React from 'react';
//import Sample from './components/Sample';
import Layout from './components/Layout/Layout';
//import './App.css';
import BurgerBuilder from './components/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './components/containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './components/containers/Orders/Orders';

function App() {
  return (
    <div className="App">

      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>

    </div>
  );
}
export default App;
