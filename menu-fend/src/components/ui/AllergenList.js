import React, {Component} from 'react'

class AllergenListSimple extends Component {
  state = {
    userAllergens: []
  }

  render() {
    let {allAllergens, config, onDeleteAllergen} = this.props
    return (<div className="allergen-list-simple" style={{
        display: "flex",
        background: "#ddd",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "flex-start"
      }}>
      {
        allAllergens
          ? allAllergens.map(allergen => (<div key={allergen._id} style={{
              background: "white",
              borderRadius: 20,
              margin: 4,
              padding: 8
            }}>
            {allergen.name}
            {allergen.acronym && (<span> ({allergen.acronym})</span>)}
            {config.canDelete && (<div style={{
                  display: "inline",
                  background: "#ccc",
                  marginLeft: 4,
                  borderRadius: "50%",
                  padding: 4,
                  textAlign: "center"
                }} className="allergen-remove-x" onClick={(e) => onDeleteAllergen(e, allergen)}>x</div>)
            }</div>))
          : <span>No Allergens found</span>
      }</div>)
  }

}

export default AllergenListSimple
