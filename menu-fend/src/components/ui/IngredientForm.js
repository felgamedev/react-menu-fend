import React, { Component } from 'react'

var baseUrl = "http://192.168.0.5:8000/api/v1/"

class IngredientForm extends Component {
  state = {
    nameValue: '',
    alteraNameValue: '',
    brandNameValue: '',
    allIngredients: null
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

  onNameChanged(e){
    let string = e.target.value

    this.setState({
      nameValue: string
    })
  }

  onAlternativeNameChanged(e){
    let string = e.target.name

    this.setState({
      alteraNameValue: string
    })
  }

  onBrandNameChanged(e){
    let string = e.target.value

    this.setState({
      brandNameValue: string
    })
  }

  render(){
    let { allIngredients, nameValue, alternativeNameValue, brandNameValue } = this.state
    return(
      <div className={(allIngredients === null) ? "ingredient-form-disabled" : "ingredient-form"}>
        <h2>Ingredients</h2>

        <form>
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
        </form>


        <h3>Temporary Ingredient List</h3>
        {allIngredients && allIngredients.map(ingredient => (<div key={ingredient._id}>{ingredient.name} - <span style={{fontStyle: "italic"}}>{ingredient.brandName}</span></div>))}
        <h3>Ingredient Inspector</h3>



      </div>)
  }
}

export default IngredientForm
