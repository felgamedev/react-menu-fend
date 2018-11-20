import React, { Component } from 'react'
import './IngredientList.css'

class IngredientList extends Component {
  state = {
    allIngredients: null
  }

  componentWillMount(){

    // Assign them to the state
    this.setState({
      allIngredients: this.props.allIngredients
    })
  }

  // Build a string of acronyms surrounded by parentheses
  getAllergenAcronyms(ingredient){
    let string = ""
    if(ingredient.allergens.length > 0){
      string += " ("
      for(let i = 0; i < ingredient.allergens.length; i++){
        let allergen = this.props.allergenMap.get(ingredient.allergens[i])
        // Add the allergen acronym or log any allergens that have slipped through which should have been deleted on the API
        string += (allergen) ? allergen.acronym : "No result on " + ingredient.name + " allergen " + i
        if(i < ingredient.allergens.length - 1) string += ", "
      }
      string += ")"
    }
    return string
  }

  onEdit(ingredient){
    console.log("Edit " + ingredient.name);
  }

  onDelete(ingredient){
    console.log("Delete " + ingredient.name);
  }

  render(){
    const { allIngredients } = this.state
    return (<div>
      <h3>Ingredient List</h3>
      <ul>
      {allIngredients.length > 0 && allIngredients.map(ingredient =>
        <li key={ingredient._id}>
          <div className="ingredient-row">
            <div className="ingredient-details">
              {ingredient.name && (<span>{ingredient.name}</span>)}
              {ingredient.brandName.length > 0 && " - "}
              {ingredient.brandName.length > 0 && <span className="ingredient-brand-name">{ingredient.brandName}</span>}
              {ingredient.allergens.length > 0 && <span>{this.getAllergenAcronyms(ingredient)}</span>}
            </div>

            <div className="ingredient-edit-column">
              <span className="ingredient-edit-button" onClick={() => this.onEdit(ingredient)}>Edit</span>
              <span className="ingredient-delete-button" onClick={() => this.onDelete(ingredient)}>Delete</span>
            </div>
          </div>
        </li>
      )}
      </ul>
      </div>)
  }
}

export default IngredientList
