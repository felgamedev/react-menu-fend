import React, { Component } from 'react';
import AllergenList from './components/AllergenList'
import Ingredient from './components/Ingredient'
import './App.css';

class App extends Component {
  state = {
    allergens: ["Lactose", "Gluten", "Soy", "Shellfish", "Nuts"]
  }

  render() {
    return (
      <div className="App">
        <AllergenList allergens={this.state.allergens}/>
        <Ingredient name="Organic Brown Rice"/>
      </div>
    );
  }
}

export default App;
