import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from './components/ui/Header'
import Menu from './components/Menu'
import Allergen from './objects/Allergen'
import './App.css';

class App extends Component {
  state = {
    allergens: [],
    user: {},
    menu: [{
      title: "Regular Menu",
      submenus: [
        {
          title: "Starters",
          items: [{
              menuItemName: "Sweet Apple Salad" },
             {
               menuItemName: "Beet Salad"
             }, {
               menuItemName: "Fish Cakes"
             } ]
        },
        {
          title: "Pizzas",
          items: [{
              menuItemName: "BBQ Chicken" },
             {
               menuItemName: "3 Cheese"
             }, {
               menuItemName: "Meat Lovers"
             } ]
        }
      ]
    },
    {
      title: "Catering Menu"
    }]
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
        <Router>
          <Route exact path="/" render={() => <Menu menu={this.state.menu[0]}/>} />
        </Router>
      </div>
    );
  }
}

export default App;
