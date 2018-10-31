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

      // auth2.isSignedIn.listen(status => {
      // })
      //
      // auth2.currentUser.listen(user =>
      // })

      this.setState({
        auth2
      })
    })


  }

  onClickLogin(){
    this.state.auth2.signIn()
    .then((user) => {
        const profile = user.getBasicProfile()

        // If the user is logged in
        if(profile){
          var self = this
          fetch(baseUrl + 'user/' + profile.getId(), {
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
                  firstName: profile.getGivenName(),
                  lastName: profile.getFamilyName(),
                  googleId: profile.getId()
                })
              })
              .then(response => response.json())
              .then(data => {
                console.log("User created:" , data);
                self.setState({
                  user: data
                })
              })
            } else {
              self.setState({ user: data })
            } })
        }

      })
    }

  onClickLogout(){
    this.state.auth2.signOut().then(() => this.setState({user: null}))
  }

  render() {
    const { user } = this.state
    return (
      <div className="App">
        {!user && (<button onClick={(e) => this.onClickLogin(e)} id="login">Login</button>)}
        {user && (<button onClick={(e) => this.onClickLogout(e)}>Logout</button>)}
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
