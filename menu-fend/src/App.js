import React, { Component } from 'react';
import AllergenList from './components/AllergenList'
import Ingredient from './components/Ingredient'
import Header from './components/ui/Header'
import './App.css';

class App extends Component {
  state = {
    allergens: ["Lactose", "Gluten", "Soy", "Shellfish", "Nuts"],
    user: null
  }

  componentDidMount(){
    // TODO Get the user logged in
  }

  render() {
    return (
      <div className="App">
        <Header user={this.state.user}/>
        <AllergenList allergens={this.state.allergens}/>
        <Ingredient name="Organic Brown Rice"/>
      </div>
    );
  }
}

export default App;
