import React, { Component } from 'react'
import Submenu from './Submenu'

class Menu extends Component {
  state = {
    menuName : "",
    submenus : []
  }

  componentDidMount(){
    this.setState({
      menuName: this.props.menu.title,
      submenus: this.props.menu.submenus
    })
  }

  render(){
    return (
      <div className="menu-list">
        <h3>{this.state.menuName}</h3>
        {this.state.submenus && this.state.submenus.map(submenu => <Submenu submenu={submenu}/>)}
      </div>
    )
  }
}

export default Menu
