import React, { Component } from 'react'

class AllergenItem extends Component {

  render(){
    return (<div className="allergen-item">{this.props.allergen.name}</div>)
  }
}

export default AllergenItem
