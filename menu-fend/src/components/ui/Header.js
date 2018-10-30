import React, { Component } from 'react'
import './Header.css'

class Header extends Component {

  render(){
    return (
      <div>
        <div className="header-container">
          <div className="header-logo"><img src="" alt="logo"/></div>
          {this.props.user && (<p>User: {this.props.user.firstName + ' ' + this.props.user.lastName}</p>)}
          {!this.props.user && (<p>Not Logged In</p>)}
        </div>
      </div>
    )
  }

}

export default Header
