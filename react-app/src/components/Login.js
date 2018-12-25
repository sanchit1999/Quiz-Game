import React, { Component } from 'react';
import './Login.css';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        username: "",
        password: "",
      },
      exist: false,
      nexist: false,
      empty: false,
    }
    this.handleUChange = this.handleUChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    this.setState({empty: false})
    this.setState({exist: false})
    this.setState({nexist: false})
    event.preventDefault();
    fetch('http://localhost:8080/login', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        console.log(response.status)
        if(response.status == 200) {
          this.setState({exist: true});
        }else if(response.status == 300) {
            this.setState({nexist: true})
        }  
        if(this.state.formData.username == "" || this.state.formData.password == "") {
          this.setState({empty: true});
        }
        if(this.state.formData.username == "admin" && this.state.formData.password == "abc@xyz") {
          localStorage.setItem("admin", 1)
          localStorage.setItem("user", "admin")
          window.location.replace("/dashboard")
        }
        if(this.state.exist) {
          localStorage.setItem("login", 1)
          localStorage.setItem("user", this.state.formData.username)
          window.location.replace("/dashboard")
        }  
      }); 
  }

  handleUChange(event) {
    this.state.formData.username = event.target.value;
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value;
  }

  render() {
    var temp;
    if(this.state.empty) {
      temp = "Enter All Fields !"
    }else if(this.state.exist) {
      temp = "Logged in !"
    }else if(this.state.nexist) {
      temp = "Invalid username or password !"
    } else {
      temp = ""
    }
    return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Login</h1>
          </header>
          <br/><br/>
          <div className="formContainer">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                  <label>Username</label>
                  <input type="text" className="form-control" value={this.state.username} onChange={this.handleUChange}/>
              </div>
              <div className="form-group">
                  <label>Password</label>
                  <input type="password" className="form-control" value={this.state.password} onChange={this.handlePChange}/>
              </div>
                  <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
          <div>
            <h2>
              {temp}
            </h2>
          </div>
        </div>
    );
  }
}

export default Signup;
