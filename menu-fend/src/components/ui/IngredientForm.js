import React, { Component } from 'react'

var baseUrl = "http://192.168.0.5:8000/api/v1/"

class IngredientForm extends Component {
  state = {
    nameValue: '',
    alternativeNameValue: '',
    brandNameValue: '',
    allIngredients: null,
    formSubmitDisabled: false,
    nameMatchFound: false,
    brandNameMatchFound: false,
    alternativeNameMatchFound: false
  }

  componentWillMount(){
    fetch(baseUrl + 'ingredient', {
      mode: "cors", headers: { "Content-type": "application/json"}
    })
    .then(response => response.json())
    .then(data => this.setState({ allIngredients: data }))
  }

  validateString(string){
    return ""
  }

  setButtonDisabled(boolean){
    this.setState({
      formSubmitDisabled: boolean
    })
  }

  onNameChanged(e){
    let string = e.target.value
    let { allIngredients, nameMatchFound } = this.state
    let matchFound = false

    // Store the value in state
    this.setState({
      nameValue: string
    })

    // Check for match
    for(let i = 0; i < allIngredients.length; i++){
      if(string.trim().toLowerCase() === allIngredients[i].name.toLowerCase()){
        matchFound = true
      }
    }

    // Set the state for button state
    if(matchFound !== nameMatchFound){
      this.setState({
        nameMatchFound: matchFound
      })
    }
  }

  onAlternativeNameChanged(e){
    let string = e.target.name

    this.setState({
      alternativeNameValue: string
    })
  }

  onBrandNameChanged(e){
    let string = e.target.value
    let { allIngredients, brandNameMatchFound } = this.state
    let matchFound = false

    this.setState({
      brandNameValue: string
    })

    // Check for match
    for(let i = 0; i < allIngredients.length; i++){
      if(string.trim().toLowerCase() === allIngredients[i].brandName.toLowerCase()){
        matchFound = true
      }
    }

    // Set the state for button state
    if(matchFound !== brandNameMatchFound){
      this.setState({
        brandNameMatchFound: matchFound
      })
    }

  }

  onSubmitForm(e){
    e.preventDefault()
    let { nameValue: name, brandNameValue: brandName, alternativeNameValue: alternativeName } = this.state
    let data = JSON.stringify({ name: name, brandName: brandName, alternativeName: alternativeName})

    fetch(baseUrl + "ingredient", {
      method: "POST",
      mode: "cors",
      body: data,
      headers: { "Content-Type" : "application/json"}
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }

  render(){
    let { allIngredients, nameValue, alternativeNameValue, brandNameValue, formSubmitDisabled,
      nameMatchFound, brandNameMatchFound, alternativeNameMatchFound } = this.state
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
          <label>
            <p>Alternative name:
            <input type="text" value={alternativeNameValue} onChange={(e) => this.onAlternativeNameChanged(e)} disabled={!String(nameValue).length > 0} hint="Enter alternative name here" /></p>
          </label>

          <button disabled={(nameValue === '') || (nameMatchFound && brandNameMatchFound)} type="submit">Submit</button>
        </form>


        <h3>Temporary Ingredient List</h3>
        {allIngredients && allIngredients.map(ingredient => (<div key={ingredient._id}>{ingredient.name} - <span style={{fontStyle: "italic"}}>{ingredient.brandName}</span></div>))}
        <h3>Ingredient Inspector</h3>



      </div>)
  }
}

export default IngredientForm
