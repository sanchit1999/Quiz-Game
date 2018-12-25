import React, { Component } from 'react';
import './qselect.css';

class qselect extends Component {
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

handleqChange(event) {
    this.setState({qu: event.target.value });
}    
handleqnChange(event) {
    if(event.target.value == "1") {
        this.setState({qno: 1})
    }else{
        this.setState({qno: 2})
    }
}

submit(event) {
    
}

render() {
return (
        <div className="App">
        <header className="App-header">
            <h1 className="App-title">Play Quiz</h1>
        </header>
        <br></br><br></br>
        <select onChange = {this.handleqChange}>
            <option value = "Select Quiz"> Select Quiz</option>
            <option value = "Movies"> Movies</option>
            <option value = "Sports"> Sports</option>
        </select>
        <br></br><br></br>
        <select onChange = {this.handleqnChange}>
            <option value = "Select Quiz Number"> Select Quiz Number</option>
            <option value = "1"> 1</option>
            <option value = "2"> 2</option>
        </select>
        <br></br><br></br>
       <button onClick = {this.submit}>Submit</button>
    </div> 
);
}
}
export default ViewQuiz;
