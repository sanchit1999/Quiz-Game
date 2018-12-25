import React, { Component } from 'react';
import './History.css';

class History extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      qu : "",
    }
    this.handleqChange = this.handleqChange.bind(this)
  }

componentDidMount() {
const request = new Request('http://127.0.0.1:8080/ghistory');
fetch(request)
    .then(response => response.json())
    .then(data => this.setState({data: data}));
}

handleqChange(event) {
    this.setState({qu :event.target.value });
}    

render() {
return (
        <div className="App">
        <header className="App-header">
            <h1 className="App-title">View History</h1>
        </header>
        <br></br><br></br>
        <select onChange = {this.handleqChange}>
            <option value = ""> Select Quiz</option>
            <option value = "Movies"> Movies</option>
            <option value = "Sports"> Sports</option>
            <option value = "Overall"> Overall</option>
        </select>
        <br></br><br></br>
        <table className="table-hover">
        <thead>
            <tr>
            <th>Username</th>
            <th>Quiz</th>
            <th>Quiz Number</th>
            <th>Score</th>
            </tr>
        </thead>
        <tbody>
        {this.state.data
            .filter(
                item =>
                    item.Username = localStorage.getItem("user")
            )
            .filter(
                item =>
                !this.state.qu || item.Quiz == this.state.qu || this.state.qu == "Overall"
            )  
            .map(function(item, key) {
                return (
                    <tr key = {key}>
                        <td>{item.Username}</td>
                        <td>{item.Quiz}</td>
                        <td>{item.Quiz_no}</td>
                        <td>{item.Score}</td>
                    </tr>
            )
            })}
        </tbody>
    </table>
    </div> 
);
}
}
export default History;
