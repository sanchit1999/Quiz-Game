import React, { Component } from 'react';
import './DeleteUsers.css';

class DeleteUsers extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/users');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }


submit(event) {
    var i;
    for(i = 1 ; i <= this.state.data.length ; i += 1) {
        if(document.getElementById(i).checked) {
            var temp = 'http://127.0.0.1:8080/users/' + document.getElementById(i).value
            fetch(temp, {
                method: 'DELETE'
            })  
        }
    }
    window.location.reload()
}
  render() {
    var temp = 1
    return (
         <div className="App">
            <header className="App-header">
             <h1 className="App-title">Delete Users</h1>
            </header>
            <table className="table-hover">
            <thead>
                <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Password</th>
                <th>Remove User</th>
                </tr>
            </thead>
            <tbody>{this.state.data.map(function(item, key) {
                return (
                    <tr key = {key}>
                        <td>{temp}</td>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.username}</td>
                        <td>{item.password}</td>
                        <td><input id = {temp} type = "checkbox" value = {item.id} name = {temp += 1}/></td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
        <br></br><br></br>
       <button onClick = {this.submit}>Submit</button>   
        </div> 
    );
  }
}
export default DeleteUsers;
