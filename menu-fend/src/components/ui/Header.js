import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
  state = {
    uid: undefined,
    user_firstName: "",
    user_lastName: ""
  }

  componentDidMount(){
    // Implement some kind of authorization
    this.setState({
      user_firstName: 'Scott',
      user_lastName: 'Hampton'
    })
  }

  render(){
    let { user_firstName: firstName, user_lastName: lastName } = this.state
    return (
      <div className="header-container">
        <div className="header-logo"><img src="" alt="logo"/></div>
        <p>User: {firstName + ' ' + lastName}</p>
      </div>

    )
  }

}

export default Header
