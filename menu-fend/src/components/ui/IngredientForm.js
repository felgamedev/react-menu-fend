import React, { Component } from 'react'
import TagSelectorCloud from './TagSelectorCloud'

var baseUrl = "http://localhost:8000/api/v1/"

class IngredientForm extends Component {
  state = {
    nameValue: '',
    brandNameValue: '',
    allIngredients: null,
    usersIngredients: null,
    nameMatchFound: false,
    brandNameMatchFound: false,
    allAllergens: [],
    allergenMap: null
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

  onNameChanged(e){
    let string = e.target.value

    this.checkForMatches(string, this.state.brandNameValue, null)

    // Store the value in state
    this.setState({
      nameValue: string
    })
  }

  onBrandNameChanged(e){
    let string = e.target.value

    this.setState({
      brandNameValue: string
    })
    this.checkForMatches(this.state.nameValue, string, null)
  }

  onAllergenSelectionChanged(e){
    let selectedAllergen = e.target.value
    let allergens = this.state.allAllergens

    for(let i = 0; i < allergens.length; i++){
      allergens[i].selected = (allergens[i]._id === selectedAllergen) ? !allergens[i].selected : allergens[i].selected
    }

    this.setState({
      allAllergens: allergens
    })
  }

  checkForMatches(name, bname){
    let { allIngredients, nameMatchFound, brandNameMatchFound } = this.state
    let nm = false, bnm = false
    // Check for match
    for(let i = 0; i < allIngredients.length; i++){
      if(name !== null && name.trim().toLowerCase() === allIngredients[i].name.trim().toLowerCase()){
        nm = true
        console.log("Checking name");
      }

      if(bname !== null && bname.trim().toLowerCase() === allIngredients[i].brandName.toLowerCase()) bnm = true
    }

    // Set the state for button state
    if(nm !== nameMatchFound) this.setState({ nameMatchFound: nm })
    if(bnm !== brandNameMatchFound) this.setState({ brandNameMatchFound: bnm })

  }

  onSubmitForm(e){
    e.preventDefault()
    let { nameValue: name, brandNameValue: brandName, allIngredients, allAllergens } = this.state

    let allergensArray = []
    allAllergens.forEach(allergen => {
      if(allergen.selected) allergensArray.push(allergen._id)
    })

    let data = JSON.stringify({ name: name, brandName: brandName, allergens: allergensArray })

    fetch(baseUrl + "ingredient", {
      method: "POST",
      mode: "cors",
      body: data,
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

  render(){
    let { allIngredients, nameValue, brandNameValue,
      nameMatchFound, brandNameMatchFound, allAllergens, allergenMap } = this.state

    let selectedAllergens = []
    allAllergens.forEach(allergen => {
      if(allergen.selected) selectedAllergens.push("" + allergen._id)
    })

    if(allIngredients) allIngredients.sort((a, b) => (a.name.toUpperCase() === b.name.toUpperCase() ? 0 : (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1))

    //if(allIngredients) console.log(allergenMap.get(allIngredients[4].allergens[0].acronym));
    return(
      <div className={(allIngredients === null) ? "ingredient-form-disabled" : "ingredient-form"}>
        <h2>Ingredients</h2>

        <form onSubmit={e => this.onSubmitForm(e)}>
          <h3>Add new Ingredient</h3>
          <label>
            <p>Name:
            <input type="text" value={nameValue} onChange={(e) => this.onNameChanged(e)} disabled={false} hint="Enter name here"/></p>
          </label>
          <label>
            <p>Brand Name:
            <input type="text" value={brandNameValue} onChange={(e) => this.onBrandNameChanged(e)} disabled={!String(nameValue).length > 0} hint="Enter brand ame if applicable" /></p>
          </label>
          {/*-- Allergens Cloud Selector-- */}
          {allAllergens.length > 0 && <TagSelectorCloud tags={allAllergens} title="Allergens"/>}
          <br/>

          <button disabled={(nameValue === '') || (nameMatchFound && brandNameMatchFound)} type="submit">Submit</button>
        </form>


        <h3>Temporary Ingredient List</h3>
        {allIngredients && allIngredients.map(ingredient =>
          <div key={ingredient._id}>
          {ingredient.name}{ingredient.brandName && " - "}{ingredient.brandName && (<span>{ingredient.brandName}</span>)}
          {ingredient.allergens.length > 0 && ingredient.allergens.map(allergen => (<span key={allergen}> ({allergenMap.get(allergen).acronym})</span>))}
        </div>)}
        <h3>Ingredient Inspector</h3>




      </div>)
  }
}

export default IngredientForm
