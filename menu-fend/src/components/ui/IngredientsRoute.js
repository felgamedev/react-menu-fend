import React, { Component } from 'react'
import SingleIngredientForm from './SingleIngredientForm'
import FoodComponentForm from './FoodComponentForm'
import './IngredientsRoute.css'

var baseUrl = "http://localhost:8000/api/v1/"

class IngredientsRoute extends Component {
  state = {
    allIngredients: null,
    usersIngredients: null,
    allAllergens: null,
    allergenMap: null,
    // Single/Component Mode variables
    singleIngredientMode: true,
    componentIngredients: [],
    componentNameValue: '',
    componentBrandNameValue: ''
  }

  componentWillMount(){
    // TODO if user is logged in, retrieve the list of ingredients they have added
    if(this.props.user !== null){
      console.log("User logged in, retrieving their ingredients");
      // Use the /u prefix to specify new route to handle find by user id
      fetch(baseUrl + 'ingredient/u/' + this.props.user._id, {
        mode: "cors", headers: { "Content-type": "application/json"}
      })
      .then(response => response.json())
      .then(data => this.setState({usersIngredients: data}))
    }

    var self = this
    var ingredients = null
    var allergens = null
    var allergenMap = new Map()

    // Retrieve all ingredients and allergens in a chain to create a map and save to state
    fetch(baseUrl + 'ingredient', {
      mode: "cors", headers: { "Content-type": "application/json"}
    })
    .then(response => response.json())
    .then(data => ingredients = data)
    .then(() =>
      {
        // Retrieve all allergens
        return fetch(baseUrl + 'allergen', {
          mode: "cors", headers: { "Content-Type": "application/json"}
        })
      }
    )
    .then(response => response.json())
    .then(data => {
      // Add a selected flag for each allergen for use in the form
      allergens = data
    })
    .then(() => {
      for(let i = 0; i < allergens.length; i++){
        allergenMap.set(allergens[i]._id, allergens[i])
      }

      self.setState({
        allIngredients: ingredients,
        allAllergens: allergens,
        allergenMap
      })
    })
  }

  onIngredientSubmitted(ingredient){

  }

  // Must be bound to this
  onSubmitSingleIngredientForm(data){
    const { allIngredients, allAllergens} = this.state

    fetch(baseUrl + "ingredient", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(data),
      headers: { "Content-Type" : "application/json"}
    })
    .then(response => response.json())
    .then(data => {
      allIngredients.push(data)
      for(let i = 0; i < allAllergens.length; i++){
        allAllergens[i].selected = false
      }
      this.setState({
        allIngredients,
        nameValue: '',
        brandNameValue: '',
        formSubmitDisabled: false
      })
    })
  }

  onSubmitFoodComponentForm(data){

  }

  toggleInputMode(singleIngredientMode){
      this.setState({
        singleIngredientMode
      })
  }

  render(){
    let { allIngredients, allAllergens, allergenMap } = this.state

    if(allIngredients) allIngredients.sort((a, b) => (a.name.toUpperCase() === b.name.toUpperCase() ? 0 : (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1))

    //if(allIngredients) console.log(allergenMap.get(allIngredients[4].allergens[0].acronym));
    return(
      <div className={(allIngredients === null) ? "ingredient-form-conatiner-disabled" : "ingredient-form-container"}>
        <h2>Add New Ingredient</h2>

        <div className="input-mode-selector-container">
          <div className="input-mode-selector" style={{backgroundColor: (this.state.singleIngredientMode ? "LightGreen" : "White") }} onClick={(e) => this.toggleInputMode(true)}>Basic Ingredient</div>
          <div className="input-mode-selector" style={{backgroundColor: (this.state.singleIngredientMode ? "White" : "LightGreen") }} onClick={(e) => this.toggleInputMode(false)}>Food Components</div>
        </div>

        {(this.state.singleIngredientMode && allAllergens) && /* Check for allAllergens as its presence means ingredients should already be loaded in chained promise */
          (<SingleIngredientForm allAllergens={allAllergens} allIngredients={allIngredients} onSubmit={this.onSubmitSingleIngredientForm.bind(this)}/>)
        }

        {(!this.state.singleIngredientMode && allAllergens) &&
          (<FoodComponentForm allAllergens={allAllergens} allIngredients={allIngredients} onSubmit={this.onSubmitFoodComponentForm.bind(this)}/>)
        }
      </div>)
  }
}

export default IngredientsRoute
