import React, { Component } from 'react';
import './Signup.css';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
      },
      submitted: false,
      exist: false,
      empty: false,
    }
    this.handleFChange = this.handleFChange.bind(this);
    this.handleLChange = this.handleLChange.bind(this);
    this.handleUChange = this.handleUChange.bind(this);
    this.handlePChange = this.handlePChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    this.state.empty = false
    this.state.exist = false
    this.state.submitted = false
    event.preventDefault();
    fetch('http://localhost:8080/signup', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 300) {
          this.setState({exist: true});
        }  
        if(this.state.formData.firstName == "" || this.state.formData.lastName === "" || this.state.formData.username === "" || this.state.formData.password === "") {
          this.setState({empty: true});
        }
        if(!this.state.exist && !this.state.empty) {
          this.setState({submitted: true});
        }
      });   
  }

  handleFChange(event) {
    this.state.formData.firstName = event.target.value
  }
  handleLChange(event) {
    this.state.formData.lastName = event.target.value
  }
  handleUChange(event) {
    this.state.formData.username = event.target.value
  }
  handlePChange(event) {
    this.state.formData.password = event.target.value
  }

  render() {
    var temp;
    if(this.state.empty) {
      temp = "Enter All Fields !"
    }else if(this.state.exist){
      temp = "Username Already Exists !"
    }else if(this.state.submitted){
      temp = "New User Created !"
    }else {
      temp = ""
    }
    if(this.state.submitted) {
      localStorage.setItem("login", 1)
      localStorage.setItem("user", this.state.formData.username)
      window.location.reload()
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Register for Quiz</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control" value={this.state.firstName} onChange={this.handleFChange}/>
            </div>
            <div className="form-group">
                <label>Last Name</label>
                <input type="text" className="form-control" value={this.state.lastName} onChange={this.handleLChange}/>
            </div>
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
