import React, { Component } from 'react'

class IngredientList extends Component {
  state = {
    allIngredients: null
  }

  componentWillMount(){
    // Grab the list of ingredients
    // Assign them to the state
    this.setState({
      allIngredients: this.props.allIngredients
    })
  }

  getAllergenAcronyms(ingredient){
    let string = ""
    if(ingredient.allergens.length > 0){
      string += " ("
      for(let i = 0; i < ingredient.allergens.length; i++){
        let allergen = this.props.allergenMap.get(ingredient.allergens[i])
        string += (allergen) ? allergen.acronym : "No result on " + ingredient.name + " allergen " + i
        if(i < ingredient.allergens.length - 1) string += ", "
      }
      string += ")"
    }
    return string
  }

  render(){
    const { allIngredients } = this.state
    return (<div>
      <h3>Ingredient List</h3>
      <ul>
      {allIngredients.length > 0 && allIngredients.map(ingredient =>
        <li key={ingredient._id}>
          {ingredient.name && (<span>{ingredient.name}</span>)}
          {ingredient.brandName.length > 0 && " - "}
          {ingredient.brandName.length > 0 && <span className="ingredient-brand-name">{ingredient.brandName}</span>}
          {ingredient.allergens.length > 0 && <span>{this.getAllergenAcronyms(ingredient)}</span>}
        </li>
      )}
      </ul>
      </div>)
  }
}

export default IngredientList
