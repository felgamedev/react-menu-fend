import React from 'react'
import SingleIngredientForm from './SingleIngredientForm'
import './FoodComponentForm.css'
const escapeStringRegexp = require('escape-string-regexp')

class FoodComponentForm extends SingleIngredientForm {
  state = {
      nameValue: '',
      brandNameValue: '',
      searchValue: '',
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
    const {allAllergens, allIngredients } = this.props
    this.setState({
      allAllergens,
      allIngredients,
      leftShownIngredients: allIngredients
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

  onSubmitForm(e){
    e.preventDefault()
    const {nameValue, brandNameValue, allAllergens} = this.state

    // let allergenArray = []
    // for(let i = 0; i < allAllergens.length; i++){
    //   if(allAllergens[i].selected) allergenArray.push(allAllergens[i]._id)
    // }
    //
    // this.props.onSubmit({ name: nameValue, brandName: brandNameValue, allergens: allergenArray})
  }

  // Move whatever ingredients are in the shown list to the selected list
  moveAllToSelected(){
    const { allIngredients, selectedIngredients, leftShownIngredients } = this.state

    for(let i = 0; i < leftShownIngredients.length; i++){
      if(!selectedIngredients.includes(leftShownIngredients[i])) selectedIngredients.push(leftShownIngredients[i])
    }

    this.setState({
      selectedIngredients
    })
  }

  moveToSelected(){
    const { allIngredients, selectedIngredients } = this.state
    for(let i = 0; i < allIngredients.length; i++){
      if(allIngredients[i].selected && !selectedIngredients.includes(allIngredients[i])) selectedIngredients.push(allIngredients[i])
    }

    for(let j = 0; j < allIngredients.length; j++){
      allIngredients[j].selected = false
    }

    this.setState({
      allIngredients,
      selectedIngredients
    })
  }

  moveAllToUnselected(){
    this.setState({
      selectedIngredients: []
    })
  }

  moveToUnselected(){
    const { selectedIngredients, prevRightHighlighted } = this.state

    for(let i = 0; i < prevRightHighlighted.length; i++){
      console.log(selectedIngredients.indexOf(prevRightHighlighted[i]));
      selectedIngredients.splice(selectedIngredients.findIndex(ing => ing._id === prevRightHighlighted[i]), 1)
    }



    this.setState({
      selectedIngredients,
      prevRightHighlighted: []
    })
  }

  onIngredientSelected(e){
    var { allIngredients, selectedIngredients, prevLeftHighlighted, prevRightHighlighted } = this.state
    var select = e.target
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
        console.log("index: " + ingredientIndex);
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

  render(){
    const {nameValue, brandNameValue, searchValue, leftShownIngredients, selectedIngredients, allAllergens, nameMatchFound, brandNameMatchFound, userIngredients} = this.state

    let selectedAllergens = []
    allAllergens.forEach(allergen => {
      if(allergen.selected) selectedAllergens.push("" + allergen._id)
    })

    return (
      <div>
        <form className="ingredient-form-component" onSubmit={e => this.onSubmitForm(e)}>
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

            <button onClick={(e) => e.preventDefault() /* onSortIngredientsList */}>Sort</button>
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
      </div>
    )
  }
}

export default FoodComponentForm
