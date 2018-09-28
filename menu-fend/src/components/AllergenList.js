import React, { Component } from 'react'
import AllergenItem from './AllergenItem'

// A reusable List for showing Allergens
class AllergenList extends Component {

  render(){
    return (<div className={"allergen-list"}>{this.props.allergens.map(allergen => <AllergenItem allergen={allergen} />)}</div>)
  }
}

export default AllergenList
