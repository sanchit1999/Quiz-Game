import React, { Component } from 'react';
import './CreateQuiz.css';

class CreateQuiz extends Component {
  constructor() {
    super();
    this.state = {
      formData: {

        quiz: "",
        quiz_no: 0,
        question: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        c_a: 0,
        c_b: 0,
        c_c: 0,
        c_d: 0,
      },
      empty: false,
      submitted: false,
    }

    this.handlequChange = this.handlequChange.bind(this);
    this.handleaChange = this.handleaChange.bind(this);
    this.handlebChange = this.handlebChange.bind(this);
    this.handlecChange = this.handlecChange.bind(this);
    this.handledChange = this.handledChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    this.state.empty = false
    this.state.submitted = false
    var t1 = document.getElementById("quiz")
    this.state.formData.quiz = t1.options[t1.selectedIndex].value;
    var t2 = document.getElementById("quiz_no")
    if(t2.options[t2.selectedIndex].value == "1") {
      this.state.formData.quiz_no = 1
    }else{
      this.state.formData.quiz_no = 2
    }
    if(document.getElementById("1").checked) {
      this.state.formData.c_a = 1
    }else{
      this.state.formData.c_a = 0
    }
    if(document.getElementById("2").checked) {
      this.state.formData.c_b = 1
    }else{
      this.state.formData.c_b = 0
    }
    if(document.getElementById("3").checked) {
      this.state.formData.c_c = 1
    }else{
      this.state.formData.c_c = 0
    }
    if(document.getElementById("4").checked) {
      this.state.formData.c_d = 1
    }else{
      this.state.formData.c_d = 0
    }
    fetch('http://localhost:8080/createquiz', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(this.state.formData.question == "" || this.state.formData.option_a == "" || this.state.formData.option_b == "" || this.state.formData.option_c == "" || this.state.formData.option_d == "" || this.state.formData.quiz == "Select Quiz" || (this.state.formData.c_a == 0 && this.state.formData.c_b == 0 && this.state.formData.c_c == 0 && this.state.formData.c_d == 0)) {
          this.setState({empty: true})
        }else {
          this.setState({submitted: true})
        }
      });   
  }

  handlequChange(event) {
    this.state.formData.question = event.target.value;
  }
  handleaChange(event) {
    this.state.formData.option_a = event.target.value;
  }
  handlebChange(event) {
    this.state.formData.option_b = event.target.value;
  }
  handlecChange(event) {
    this.state.formData.option_c = event.target.value;
  }
  handledChange(event) {
    this.state.formData.option_d = event.target.value;
  }
  render() {
    
    var temp;
    if(this.state.empty) {
      temp = "Enter All Fields !"
    }else if(this.state.submitted){
      temp = "Quiz Added"
    } else {
      temp = ""
    }
    if(this.state.submitted) {
      window.location.reload()
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">New Quiz</h1>
        </header>
        <br/><br/>
        <div className="formContainer"> 
          <form onSubmit={this.handleSubmit}>
            <select id = "quiz">
              <option value = "Select Quiz">Select Quiz</option>
              <option value = "Sports">Sports</option>
              <option value = "Movies">Movies</option>
            </select>
            <br></br><br></br>
            <select id = "quiz_no">
              <option value = "Select Quiz no">Select Quiz no</option>              
              <option value = "1">Quiz1</option>
              <option value = "2">Quiz2</option>
            </select>
            <br></br><br></br>
            <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.question} onChange={this.handlequChange}/>
            </div>
            <div className="form-group">
                <label>Option A</label>
                <input type="text" className="form-control" value={this.state.option_a} onChange={this.handleaChange}/>
            </div>
            <div className="form-group">
                <label>Option B</label>
                <input type="text" className="form-control" value={this.state.option_b} onChange={this.handlebChange}/>
            </div>
            <div className="form-group">
                <label>Option C</label>
                <input type="text" className="form-control" value={this.state.option_c} onChange={this.handlecChange}/>
            </div>
            <div className="form-group">
                <label>Option D</label>
                <input type="text" className="form-control" value={this.state.option_d} onChange={this.handledChange}/>
            </div>
            Correct Option(s) : 
            <br></br><br></br>
            <label>Option A</label>
            <input type="checkbox" id = "1" className="form-control" value="correct_a"/>
            <label>Option B</label>
            <input type="checkbox" id = "2" className="form-control" value="correct_b"/>
            {/* <br></br><br></br> */}
            <label>Option C</label>
            <input type="checkbox" id = "3" className="form-control" value="correct_c"/>
            {/* <br></br><br></br> */}
            <label>Option D</label>
            <input type="checkbox" id = "4" className="form-control" value="correct_d"/>
            <br></br><br></br>
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

export default CreateQuiz;
