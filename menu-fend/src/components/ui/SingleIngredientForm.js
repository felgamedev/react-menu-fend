import React, { Component } from 'react'
import { TagSelectorCloud } from './TagSelectorCloud'

class SingleIngredientForm extends Component {
  state = {
      nameValue: '',
      brandNameValue: '',
      allAllergens: [],

      nameMatchFound: false,
      brandNameMatchFound: false,
  }

  componentWillMount(){
    const {allAllergens, allIngredients } = this.props
    this.setState({
      allAllergens,
      allIngredients
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
    const {nameValue, brandNameValue, allAllergens} = this.state

    let allergenArray = []
    for(let i = 0; i < allAllergens.length; i++){
      if(allAllergens[i].selected) allergenArray.push(allAllergens[i]._id)
    }

    this.props.onSubmit({ name: nameValue, brandName: brandNameValue, allergens: allergenArray})
  }

  render(){
    const {nameValue, brandNameValue, allAllergens, nameMatchFound, brandNameMatchFound } = this.state

    let selectedAllergens = []
    allAllergens.forEach(allergen => {
      if(allergen.selected) selectedAllergens.push("" + allergen._id)
    })

    return (
      <div>
        <form className="ingredient-form-single" onSubmit={e => this.onSubmitForm(e)}>
          <label>
            <p>Name:
            <input type="text" value={nameValue} onChange={(e) => this.onNameChanged(e)} disabled={false} placeholder="e.g. Oat flour"/></p>
          </label>
          <label>
            <p>Brand Name:
            <input type="text" value={brandNameValue} onChange={(e) => this.onBrandNameChanged(e)} disabled={!String(nameValue).length > 0} placeholder="e.g. Big Mill" /></p>
          </label>
          {/*-- Allergens Cloud Selector-- */}
          {allAllergens.length > 0 && <TagSelectorCloud tags={allAllergens} title="Allergens"/>}
          <br/>

          <button disabled={(nameValue === '') || (nameMatchFound && brandNameMatchFound)} type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default SingleIngredientForm
