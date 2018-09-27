import React, { Component } from 'react'

class Allergen extends Component {

  render(){
    return (<div className="allergen-item">{this.props.allergen}</div>)
  }
}

export default Allergen
