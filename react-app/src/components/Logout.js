import React, { Component } from 'react';
import './Logout.css';

class Logout extends Component {
  render(){
    localStorage.setItem("login",0)
    localStorage.setItem("admin",0)
    localStorage.setItem("user", "")
    window.location.reload()
    return(
      <div>
      </div>
      );
  }
}
export default Logout;