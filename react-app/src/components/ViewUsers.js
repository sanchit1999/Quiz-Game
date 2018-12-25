import React, { Component } from 'react';
import './ViewUsers.css';

class ViewUsers extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/users');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    var temp = 1
    return (
         <div className="App">
            <header className="App-header">
             <h1 className="App-title">View All Users</h1>
            </header>
            <table className="table-hover">
            <thead>
                <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Password</th>
                </tr>
            </thead>
            <tbody>{this.state.data.map(function(item, key) {
                return (
                    <tr key = {key}>
                        <td>{temp}</td>
                        <td name = {temp += 1}>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.username}</td>
                        <td>{item.password}</td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
        </div> 
    );
  }
}

export default ViewUsers;
