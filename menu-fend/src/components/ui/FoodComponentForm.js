import React from 'react'
import SingleIngredientForm from './SingleIngredientForm'
import './IngredientForms.css'
const escapeStringRegexp = require('escape-string-regexp')

class FoodComponentForm extends SingleIngredientForm {
  state = {
      allergenMap: null,
      ingredientMap: null,

      nameValue: '',
      brandNameValue: '',

      searchValue: '',
      allFoodComponents: null,
      allAllergens: [],
      allIngredients: null,
      // Ingredients in the right hand select
      selectedIngredients: [],
      // Filtered list of ingredients on left hand select
      leftShownIngredients: [],
      // last known id's of highlighted ingredients in the left hand select
      prevLeftHighlighted: [],
      // last known id's of highlighted ingredients in the right hand select
      prevRightHighlighted: [],

      nameMatchFound: false,
      brandNameMatchFound: false,
  }

  componentWillMount(){
    const {allAllergens, allIngredients, allFoodComponents, ingredientMap, allergenMap } = this.props

    this.setState({
      allAllergens,
      allIngredients,
      leftShownIngredients: allIngredients.map(ingredient => ingredient),
      allFoodComponents,
      allergenMap, ingredientMap
    })


  }

  onFilterValueChange(e){
    let { leftShownIngredients } = this.state
    let string = e.target.value
    let escapedString = escapeStringRegexp(string)

    let match = new RegExp(escapedString.toLowerCase())

    // Reset if search value removed
    if(string.length === 0) {
      leftShownIngredients = this.state.allIngredients
    }

    if(string.length > 0){
      leftShownIngredients = leftShownIngredients.filter(ing => match.test(ing.name.toLowerCase()) || match.test(ing.brandName.toLowerCase()))
    }

    this.setState({
      searchValue: string,
      leftShownIngredients
    })

  }

  onSubmit(e){
    e.preventDefault()
    const { allIngredients, selectedIngredients, allFoodComponents, nameValue, brandNameValue } =  this.state
    var self = this

    let ingredientsArray = []
    for(let i = 0; i < selectedIngredients.length; i++){
      ingredientsArray.push(selectedIngredients[i]._id)
    }

    fetch(this.props.baseUrl + "foodcomponent", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ name: nameValue, brandName: brandNameValue, ingredients: ingredientsArray}),
      headers: { "Content-Type" : "application/json"}
    })
    .then(response => response.json())
    .then(data => {
      allFoodComponents.push(data)
      self.setState({
        allFoodComponents,
        nameValue: '',
        brandNameValue: '',
        selectedIngredients: [],
        leftShownIngredients: allIngredients.map(ing => ing)
      })
    })
  }

  // Move an ingredient to the right.
  // Does not change the state
  moveIngredientRight(ingredient){
    const { selectedIngredients } = this.state
    // Push them into the selected list
    selectedIngredients.push(ingredient)
    // Remove the selected flag
    ingredient.selected = false
  }

  // Move whatever ingredients are in the shown list to the selected list
  moveAllToSelected(){
    const { selectedIngredients } = this.state
    var { leftShownIngredients, prevLeftHighlighted } = this.state
    // Move all to the right
    for(let i = 0; i < leftShownIngredients.length; i++){
      // Shorthand the ingredient
      let ingredient = leftShownIngredients[i]
      // Move to right
      this.moveIngredientRight(ingredient)
    }

    // Empty the left list
    leftShownIngredients = []
    // Clear the previously highlighted array
    prevLeftHighlighted = []

    this.setState({
      prevLeftHighlighted,
      leftShownIngredients,
      selectedIngredients
    })
  }

  moveToSelected(){
    const { selectedIngredients, leftShownIngredients } = this.state
    var { prevLeftHighlighted } = this.state
    // Cycle through all of the ingredients
    for(let i = 0; i < leftShownIngredients.length; i++){
      // Shorthand the ingredient
      let ingredient = leftShownIngredients[i]

      // When selected ingredients are found move to selected
      if(ingredient.selected) this.moveIngredientRight(ingredient)
    }

    // Remove the previously highlighted ingredients from the left
    for(let i = 0; i < prevLeftHighlighted.length; i++){
      leftShownIngredients.splice(leftShownIngredients.findIndex(ing => ing._id === prevLeftHighlighted[i]), 1)
    }

    // Clear the previously highlighted array
    prevLeftHighlighted = []

    this.setState({
      leftShownIngredients,
      selectedIngredients,
      prevLeftHighlighted
    })
  }

  // Remove all ingredients from the selected array, back to the shown array
  moveAllToUnselected(){
    let { leftShownIngredients } = this.state
    const { allIngredients, searchValue } = this.state

    leftShownIngredients = allIngredients.map(ing => ing)

    this.setState({
      leftShownIngredients,
      selectedIngredients: [],
      prevRightHighlighted: [],
      searchValue
    })
  }

  moveToUnselected(){
    const { selectedIngredients, prevRightHighlighted, leftShownIngredients, allIngredients } = this.state

    for(let i = 0; i < prevRightHighlighted.length; i++){
      selectedIngredients.splice(selectedIngredients.findIndex(ing => ing._id === prevRightHighlighted[i]), 1)

      leftShownIngredients.push(allIngredients[allIngredients.findIndex(ing => ing._id === prevRightHighlighted[i])])
    }

    this.setState({
      selectedIngredients,
      prevRightHighlighted: []
    })
  }

  onIngredientSelected(e){
    var { allIngredients, selectedIngredients, prevLeftHighlighted, prevRightHighlighted } = this.state
    var options = e.target.options

    // Determine which select is being changed by checking its id
    var left = e.target.id === "leftSelect" ? true : false

    // Pick the required prevHighlighted array depending on the left bool
    let prevHighlighted = (left) ? prevLeftHighlighted : prevRightHighlighted
    var highlightedIngredients = []

    // Deselect all previously highlighted ingredients in the allIngredients array
    for(let i = 0; i < prevHighlighted.length; i++){
      let index = allIngredients.findIndex(ing => ing._id === prevHighlighted[i])
      allIngredients[index].selected = false
    }

    // Create a new list of highlighted ingredients from the select
    for(let i = 0; i < options.length; i++){
      if(options[i].selected) highlightedIngredients.push(options[i].value)
    }

    if(left){
      for(let j = 0; j < highlightedIngredients.length; j++){
        let ingredientIndex = allIngredients.findIndex(ing => ing._id === highlightedIngredients[j])
        allIngredients[ingredientIndex].selected = true
      }

      this.setState({
        allIngredients: allIngredients,
        prevLeftHighlighted: highlightedIngredients
      })
    } else {
      this.setState({
        selectedIngredients: selectedIngredients,
        prevRightHighlighted: highlightedIngredients
      })
    }

  }

  onSortLeft(e){
    e.preventDefault()
    let { leftShownIngredients } = this.state

    leftShownIngredients = leftShownIngredients.sort((a,b) => a.name === b.name ? 0 : a.name > b.name ? 1 : -1)

    this.setState({
      leftShownIngredients
    })
  }

  render(){
    const {nameValue, brandNameValue, searchValue, leftShownIngredients, allIngredients, selectedIngredients, allAllergens, nameMatchFound, brandNameMatchFound, userIngredients} = this.state

    let selectedAllergens = []
    allAllergens.forEach(allergen => {
      if(allergen.selected) selectedAllergens.push("" + allergen._id)
    })

    return (
      <div>
        <form className="ingredient-form-component" onSubmit={e => this.onSubmit(e)}>
        <p>Here you can put together components that are either bought/premade (such as worcestershire sauce) or that have set recipes (such as a salsa)</p>

          <div className="ingredient-names-container">
            <label>
              <p>Name:
              <input type="text" value={nameValue} onChange={(e) => this.onNameChanged(e)} disabled={false} placeholder="e.g. Sour Cream"/></p>
            </label>
            <label>
              <p>Brand Name:
              <input type="text" value={brandNameValue} onChange={(e) => this.onBrandNameChanged(e)} disabled={!String(nameValue).length > 0} placeholder="e.g. Farmers" /></p>
            </label>
          </div>

          <div className="ingredient-selectors-filter-container">
            {/* To be implemented when I have the user finalized */}
            {userIngredients &&<label>
              <p>
              <input type="checkbox" checked={false /* isMyIngredientsChecked */} onChange={() => null /* this.onMyIngredientsCheckboxChanged */ }/>Only my ingredients:</p>
            </label>}

            <label>
              <p>Search:
              <input type="text" value={searchValue} onChange={(e) => this.onFilterValueChange(e)} /></p>
            </label>

            {leftShownIngredients.length > 0 && <button onClick={(e) => this.onSortLeft(e)}>Sort</button>}
          </div>



          <div className="ingredient-selectors-container">
            <select id="leftSelect" multiple size={12} onChange={(e) => this.onIngredientSelected(e)}>
              {leftShownIngredients.length > 0 && leftShownIngredients.map(ingredient =>
                (<option key={ingredient._id} value={ingredient._id}>{ingredient.name}{ingredient.brandName && (" - " + ingredient.brandName)}</option>)
              )}
            </select>

            <div className="ingredient-selectors-button-container">
              <div className="ingredient-selector-button move-all-right" onClick={() => this.moveAllToSelected()}>All Right</div>
              <div className="ingredient-selector-button move-selected-right" onClick={() => this.moveToSelected()}>Selected Right</div>
              <div className="ingredient-selector-button move-selected-left" onClick={() => this.moveToUnselected()}>Selected Left</div>
              <div className="ingredient-selector-button move-all-left" onClick={() => this.moveAllToUnselected()}>All Left</div>
            </div>

            <select multiple size={12} onChange={(e) => this.onIngredientSelected(e)}>
              {selectedIngredients.length > 0 && selectedIngredients.map(ingredient =>
                (<option key={ingredient._id} value={ingredient._id}>{ingredient.name}{ingredient.brandName && (" - " + ingredient.brandName)}</option>))}
            </select>
          </div>

          <div className="ingredients-summary">
            <p>{/* if ingredients are in the selected list, show a summary */}</p>
          </div>

          <button disabled={(nameValue === '') || (nameMatchFound && brandNameMatchFound)} type="submit">Submit</button>
        </form>

        <h2>Temporary FoodComponent List</h2>
        <ul>
          {this.state.allFoodComponents.length > 0 && this.state.allFoodComponents.map(fc => (<li key={fc._id}>{fc.name}</li>))}
        </ul>
      </div>
    )
  }
}

export default FoodComponentForm
