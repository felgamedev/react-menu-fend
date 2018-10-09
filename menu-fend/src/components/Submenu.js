import React, { Component } from 'react'

class Submenu extends Component {

  render(){
    return (
      <div>
        <h3>{this.props.submenu.title}</h3>
        <ul>
          {this.props.submenu.items.map(item => <li key={item.menuItemName}>{item.menuItemName}</li>)}
        </ul>
      </div>)
  }
}

export default Submenu
