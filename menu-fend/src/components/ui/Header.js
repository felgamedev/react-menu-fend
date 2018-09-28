import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
  state = {
  }

  componentDidMount(){

  }

  render(){
    let { user_firstName: firstName = "Bob", user_lastName: lastName = "Davis"} = this.props.user
    return (
      <div className="header-container">
        <div className="header-logo"><img src="" alt="logo"/></div>
        <p>User: {firstName + ' ' + lastName}</p>
      </div>

    )
  }

}

export default Header
