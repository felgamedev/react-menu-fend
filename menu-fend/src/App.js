import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from './components/ui/Header'
import Menu from './components/Menu'
import AllergenForm from './components/ui/AllergenForm'
import IngredientForm from './components/ui/IngredientForm'
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

    this.setState({
      user: userLoggedIn
    })
  }

  render() {
    return (
      <div className="App">
        <Header user={this.state.user}/>
        <Router>
          <div>
            <Link to="/"><div>Home</div></Link>
            <Link to="/allergen"><div>Allergens</div></Link>
            <Link to="/ingredient"><div>Ingredients</div></Link>

            <Route exact path="/" render={() => <Menu menu={this.state.menu[0]}/>} />
            <Route exact path="/allergen" render={() => <AllergenForm />} />
            <Route exact path="/ingredient" render={() => <IngredientForm />} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
