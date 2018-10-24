import React, { Component } from 'react'

var baseUrl = "http://192.168.0.5:8000/api/v1/"

class IngredientForm extends Component {
  state = {
    nameValue: '',
    brandNameValue: '',
    allIngredients: null,
    nameMatchFound: false,
    brandNameMatchFound: false,
  }

  componentWillMount(){
    fetch(baseUrl + 'ingredient', {
      mode: "cors", headers: { "Content-type": "application/json"}
    })
    .then(response => response.json())
    .then(data => this.setState({ allIngredients: data }))
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
    let matchFound = false

    this.setState({
      brandNameValue: string
    })
    this.checkForMatches(this.state.nameValue, string, null)
  }

  checkForMatches(name, bname, aname){
    let { allIngredients, nameMatchFound, brandNameMatchFound } = this.state
    let nm = false, bnm = false, anm = false
    debugger
    // Check for match
    for(let i = 0; i < allIngredients.length; i++){
      console.log(name && (name.trim().toLowerCase() === allIngredients[i].name.toLowerCase()));
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
    let { nameValue: name, brandNameValue: brandName, allIngredients } = this.state
    let data = JSON.stringify({ name: name, brandName: brandName})

    fetch(baseUrl + "ingredient", {
      method: "POST",
      mode: "cors",
      body: data,
      headers: { "Content-Type" : "application/json"}
    })
    .then(response => response.json())
    .then(data => {
      allIngredients.push(data)
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
      nameMatchFound, brandNameMatchFound } = this.state
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

          <button disabled={(nameValue === '') || (nameMatchFound && brandNameMatchFound)} type="submit">Submit</button>
        </form>


        <h3>Temporary Ingredient List</h3>
        {allIngredients && allIngredients.map(ingredient => <div key={ingredient._id}>{ingredient.name}{ingredient.brandName && " - "}{ingredient.brandName && (<span>{ingredient.brandName}</span>)}</div>)}
        <h3>Ingredient Inspector</h3>



      </div>)
  }
}

export default IngredientForm
