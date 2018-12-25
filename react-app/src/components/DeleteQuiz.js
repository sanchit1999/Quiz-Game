import React, { Component } from 'react';
import './DeleteQuiz.css';

class DeleteQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      qu : "",
      qno : 0,
    }
    this.handleqChange = this.handleqChange.bind(this)
    this.handleqnChange = this.handleqnChange.bind(this)
    this.submit = this.submit.bind(this);
  }
componentDidMount() {
const request = new Request('http://127.0.0.1:8080/questions');
fetch(request)
    .then(response => response.json())
    .then(data => this.setState({data: data}));
}

submit(event) {
    var i;
    for(i = 1; i <= this.state.data.length ; i += 1) {
        var y =document.getElementById(i)
        if(y == null) break
        if(y.checked) {
            var t = 'http://127.0.0.1:8080/questions/' + y.value
            fetch(t, {
                method : 'DELETE'
            })
        }
    }
    window.location.reload()
}
handleqChange(event) {
    this.setState({qu : event.target.value});
}    
handleqnChange(event) {
    if(event.target.value == "1") {
        this.setState({qno: 1})
    }else{
        this.setState({qno: 2})
    }
}

render() {
    var temp = 1
return (
        <div className="App">
        <header className="App-header">
            <h1 className="App-title">Delete Questions</h1>
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
            <th>Remove Question</th>
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
                        <td><input id = {temp} name = {temp += 1} type = "checkbox" value = {item.option_a}/> </td>
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
export default DeleteQuiz;
