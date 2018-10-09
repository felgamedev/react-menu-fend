import React, { Component } from 'react'

class AllergenListSimple extends Component {
  state = {
    userAllergens: []
  }

  render(){
    let {allAllergens, config, onDelete} = this.props
    return (
      <div className="allergen-list-simple" >{allAllergens ?
      allAllergens.map(allergen => (
        <span key={allergen._id}>
          {allergen.name}{config.canDelete && (<div style={
            {display: "inline", background: "#ccc", marginLeft: 4, borderRadius: "50%", minWidth: 16}}
            className="allergen-remove-x"
            onClick={(e) => onDelete(e, allergen)}>x</div>)}</span>))
        : <span>No Allergens found</span>}</div>
    )
  }

}

export default AllergenListSimple
