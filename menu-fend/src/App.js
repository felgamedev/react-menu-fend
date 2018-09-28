import React, { Component } from 'react';
import AllergenList from './components/AllergenList'
import Ingredient from './components/Ingredient'
import Header from './components/ui/Header'
import Allergen from './objects/Allergen'
import './App.css';

class App extends Component {
  state = {
    allergens: [],
    user: {}
  }

  componentWillMount(){

  }

  componentDidMount(){
    // TODO Get the user logged in
    let userLoggedIn = {
      uid: 1987,
      user_firstName: "Scott",
      user_lastName: "Hampton"
    }

    // TODO switch from static to API data
    let allergensRaw = ["Lactose", "Gluten", "Soy", "Shellfish", "Nuts"]
    //let allergensRaw = getAllergerns()

    let allergensList = []
    for(let i = 0; i < allergensRaw.length; i++){
      let allergen = new Allergen();
      allergen.name = allergensRaw[i]
      allergen.id = i
      allergensList.push(allergen)
    }

    this.setState({
      user: userLoggedIn,
      allergens: allergensList
    })
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
