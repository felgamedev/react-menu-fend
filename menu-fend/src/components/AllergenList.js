import React, { Component } from 'react'
import Allergen from './Allergen'

// A reusable List for showing Allergens
class AllergenList extends Component {

  render(){
    return (<div className={"allergen-list"}>{this.props.allergens.map(allergen => <Allergen allergen={allergen} />)}</div>)
  }
}

export default AllergenList
