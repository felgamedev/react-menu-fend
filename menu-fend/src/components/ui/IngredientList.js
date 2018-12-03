import React, { Component } from 'react'
import './IngredientList.css'

class IngredientList extends Component {
  state = {
    allIngredients: null,
    currentEditIngredient: null,
    editMode_brandNameValue: '',
    editMode_nameValue: '',
    editMode_nameMatchFound: false,
    editMode_brandNameMatchFound: false
  }

  componentWillMount(){
    const { allIngredients } = this.props

    // Assign them to the state
    this.setState({
      allIngredients: allIngredients
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
    this.setState({
      currentEditIngredient: ingredient
    })
  }

  onDelete(ingredient){
    console.log("Delete " + ingredient.name);
  }

  onSaveEdit(){
    let { currentEditIngredient, editMode_nameValue, editMode_brandNameValue } = this.state
    let ingredient = currentEditIngredient
    ingredient.name = editMode_nameValue === '' ? ingredient.name : editMode_nameValue
    ingredient.brandName = editMode_brandNameValue === '' ? ingredient.brandName : editMode_brandNameValue
    this.props.onUpdateSingleIngredient(ingredient)
    this.onCancelEdit()
  }

  // Cancel all changes to the state values of the inputs and remove the currentEditIngredient
  onCancelEdit(){
    this.setState({
      editMode_nameValue: '',
      editMode_brandNameValue: '',
      currentEditIngredient: null,
      nameMatchFound: false
    })
  }

  onNameChanged(e){
    const { allIngredients } = this.state
    let string = e.target.value
    let nameMatchFound

    for(let i = 0; i < allIngredients.length; i++){
      if(allIngredients[i].name.toLowerCase() === string.trim().toLowerCase()) nameMatchFound = true
    }

    this.setState({
      editMode_nameValue: string,
      nameMatchFound
    })
  }

  onEditNameChanged(e){
    const { editMode_nameValue, allIngredients } = this.state
    let string = e.target.value

    let matchFound = false
    for(let i = 0; i < allIngredients.length; i++){
      if(string.trim().toLowerCase() === allIngredients[i].name.trim().toLowerCase()) matchFound = true
    }

    this.setState({
      editMode_nameValue: string,
      editMode_nameMatchFound: matchFound
    })
  }

  onEditBrandNameChanged(e){
    const { editMode_brandNameValue, allIngredients } = this.state
    let string = e.target.value

    let matchFound = false
    for(let i = 0; i < allIngredients.length; i++){
      if(string.trim().toLowerCase() === allIngredients[i].brandName.trim().toLowerCase()) matchFound = true
    }

    this.setState({
      editMode_brandNameValue: string
    })
  }

  render(){
    const { allIngredients, currentEditIngredient, editMode_nameValue, editMode_brandName, editMode_nameMatchFound, editMode_brandNameMatchFound } = this.state
    return (<div>
      <h3>Ingredient List</h3>
      <ul>
        {allIngredients.length > 0 && allIngredients.map(ingredient =>
          <li key={ingredient._id}>
            {currentEditIngredient !== ingredient && (
              <div className="ingredient-row">
                <div className="ingredient-details">
                  {ingredient.name && (<span>{ingredient.name}</span>)}
                  {ingredient.brandName.length > 0 && " - "}
                  {ingredient.brandName.length > 0 && <span className="ingredient-brand-name">{ingredient.brandName}</span>}
                  {ingredient.allergens.length > 0 && <span>{this.getAllergenAcronyms(ingredient)}</span>}
                </div>

                <div className="ingredient-edit-column">
                  <button className="ingredient-row-button" onClick={() => this.onEdit(ingredient)}>Edit</button>
                  <button className="ingredient-row-button" onClick={() => this.onDelete(ingredient)}>Delete</button>
                </div>
              </div>
            )}

            {currentEditIngredient === ingredient &&
              (<div className="ingredient-row">
                <div className="ingredient-details">
                  {ingredient.name && (<input type="text" value={editMode_nameValue} placeholder={ingredient.name} onChange={(e) => this.onEditNameChanged(e)}/>)}
                  {ingredient.brandName && " - "}
                  {ingredient.brandName && <input type="text" value={editMode_brandName} placeholder={ingredient.brandName} onChange={(e) => this.onEditBrandNameChanged(e)} />}
                  {ingredient.allergens.length > 0 && <span>{this.getAllergenAcronyms(ingredient)}</span>}
                </div>

                <div className="ingredient-edit-column">
                  <button disabled={editMode_nameMatchFound || editMode_brandNameMatchFound} className="ingredient-row-button" onClick={() => this.onSaveEdit()}>Save</button>
                  <button className="ingredient-row-button" onClick={() => this.onCancelEdit()}>Cancel</button>
                </div>
              </div>)
            }
          </li>
        )}
      </ul>
      </div>)
  }
}

export default IngredientList
