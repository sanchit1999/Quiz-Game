import React, { Component } from 'react';
import './ViewQuiz.css';

class ViewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      qu : "",
      qno : 0,
    }
    this.handleqChange = this.handleqChange.bind(this)
    this.handleqnChange = this.handleqnChange.bind(this)
  }

componentDidMount() {
const request = new Request('http://127.0.0.1:8080/questions');
fetch(request)
    .then(response => response.json())
    .then(data => this.setState({data: data}));
}

handleqChange(event) {
    this.setState({qu :event.target.value });
}    
handleqnChange(event) {
    if(event.target.value == "1") {
        this.setState({qno:1})
    }else{
        this.setState({qno:2})
    }
}

render() {
    console.log(this.state.data)
return (
        <div className="App">
        <header className="App-header">
            <h1 className="App-title">View Quiz</h1>
        </header>
        <br></br><br></br>
        <select onChange = {this.handleqChange}>
            <option value = ""> Select Quiz</option>
            <option value = "Movies"> Movies</option>
            <option value = "Sports"> Sports</option>
        </select>
        <br></br><br></br>
        <select onChange = {this.handleqnChange}>
            <option value = ""> Select Quiz Number</option>
            <option value = "1"> 1</option>
            <option value = "2"> 2</option>
        </select>
        <br></br><br></br>
        <table className="table-hover">
        <thead>
            <tr>
            <th>Question</th>
            <th>Option A</th>
            <th>Option B</th>
            <th>Option C</th>
            <th>Option D</th>
            <th>Value_A</th>
            <th>Value_B</th>
            <th>Value_C</th>
            <th>Value_D</th>
            </tr>
        </thead>
        <tbody>
        {this.state.data
            .filter(
                item =>
                !this.state.qu || item.quiz == this.state.qu
            ).filter(
                item =>
                !this.state.qno || item.quiz_no == this.state.qno
            )  
            .map(function(item, key) {
                return (
                    <tr key = {key}>
                        <td>{item.question}</td>
                        <td>{item.option_a}</td>
                        <td>{item.option_b}</td>
                        <td>{item.option_c}</td>
                        <td>{item.option_d}</td>
                        <td>{item.c_a}</td>
                        <td>{item.c_b}</td>
                        <td>{item.c_c}</td>
                        <td>{item.c_d}</td>
                    </tr>
            )

            })}
        </tbody>
    </table>
    </div> 
);
}
}
export default ViewQuiz;
