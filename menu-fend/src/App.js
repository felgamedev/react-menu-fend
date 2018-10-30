import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from './components/ui/Header'
import Menu from './components/Menu'
import AllergenForm from './components/ui/AllergenForm'
import IngredientForm from './components/ui/IngredientForm'
import Allergen from './objects/Allergen'
import './App.css';

var baseUrl = "http://localhost:8000/api/v1/"

class App extends Component {
  state = {
    auth2: null,
    allergens: [],
    user: null,
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
    this.runGoogleLoginInit()
  }

  runGoogleLoginInit(){
    const gapi = window.gapi
    gapi.load("auth2", () => {
      console.log("Loading auth2");
      const auth2 = gapi.auth2.init({
        clientId: "23127013757-6qei2k33fp0v6svtol5hv7lpsaekfqhs.apps.googleusercontent.com"
      });

      auth2.isSignedIn.listen(status => {
        console.log(status)
      })


      auth2.currentUser.listen(user => {
        const profile = user.getBasicProfile()

        // If the user is logged in
        if(profile){
          // Retrieve their basic info
          var userLoggedIn = {
            user_firstName: profile.getGivenName(),
            user_lastName: profile.getFamilyName(),
            googleId: profile.getId(),
            userId: null
          }

          var self = this
          fetch(baseUrl + 'user/' + userLoggedIn.googleId, {
            mode: 'cors', headers: {'Content-Type': 'application/json'}
          })
          .then(response => response.json())
          .then(data => {
            console.log("User info retrieved: ", data);
            // create user if failed to retrieve one
            if(!data){
              console.log("User doesnt exist!");
              fetch(baseUrl + 'user/', {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                  firstName: userLoggedIn.user_firstName,
                  lastName: userLoggedIn.user_lastName,
                  googleId: userLoggedIn.googleId
                })
              })
              .then(response => response.json())
              .then(data => {
                console.log("User created:" , data);
                userLoggedIn.userId = data._id
                self.setState({
                  user: userLoggedIn
                })
              })
            } else {
              // User found!
              userLoggedIn.userId = data._id
              self.setState({ user: userLoggedIn})
            }
          })
        }
        //
        self.setState({
          user: userLoggedIn
        })
      })

      this.setState({
        auth2
      })
    })


  }

  onClickLogin(){
    this.state.auth2.signIn()
  }

  onClickLogout(){
    this.state.auth2.signOut()
  }

  render() {
    return (
      <div className="App">
        <button onClick={(e) => this.onClickLogin(e)} id="login">Login</button>
        <button onClick={(e) => this.state.auth2.signOut()}>Logout</button>
        <Header user={this.state.user}/>
        <Router>
          <div>
            <Link to="/"><div>Home</div></Link>
            <Link to="/allergen"><div>Allergens</div></Link>
            <Link to="/ingredient"><div>Ingredients</div></Link>

            <Route exact path="/" render={() => <Menu menu={this.state.menu[0]}/>} />
            <Route exact path="/allergen" render={() => <AllergenForm />} />
            <Route exact path="/ingredient" render={() => <IngredientForm user={this.state.user}/>} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
