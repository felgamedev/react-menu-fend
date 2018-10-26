import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
  state = {
    user: null
  }

  render(){
    let { user_firstName: firstName = "Bob", user_lastName: lastName = "Davis"} = this.props.user
    return (
      <div>
        <div className="header-container">
          <div className="header-logo"><img src="" alt="logo"/></div>
          <p>User: {firstName + ' ' + lastName}</p>
        </div>
      </div>
    )
  }

}

export default Header
