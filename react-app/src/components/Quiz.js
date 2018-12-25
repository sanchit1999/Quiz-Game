import React, { Component } from 'react';
import './Quiz.css';

class Quiz extends Component {
  constructor() {
    super();
    this.state = {
        formData: {
            quiz: "",
            quiz_no: 0,
            score: 0,
            username: "",
        },
        hisData : {
            username: "",
            quiz: "",
            quiz_no: 0,
            score: 0,
        },
        lData: {
            username: "",
            quiz: "",
            score: 0.
        },
        data_filter: [],  
        qu : "",
        qno : 0,
        s1: false,
        s2: false,
        s3: false,
        lifeline: 0,
        score: 0,
    }
    this.handleqChange = this.handleqChange.bind(this)
    this.handleqnChange = this.handleqnChange.bind(this)
    this.submit1 = this.submit1.bind(this)
    this.submit2 = this.submit2.bind(this)
    this.submit3 = this.submit3.bind(this)
    this.Life = this.Life.bind(this)
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


submit1(event) {
    event.preventDefault();
    var temp = 'http://127.0.0.1:8080/quizques/' + this.state.qu + '/' + this.state.qno
    const request = new Request(temp);
    fetch(request)
    .then(response => response.json())
    .then(data_filter => {
        this.setState({data_filter: data_filter})
    })
    this.state.lifeline = 0;
    this.setState({s1: true})
}

Life(event) {
    this.setState({lifeline: 1})
}
submit2(event) {
    event.preventDefault();
    this.state.score = 0;
    var t_a = document.getElementsByClassName("1")
    var t_b = document.getElementsByClassName("2")
    var t_c = document.getElementsByClassName("3")
    var t_d = document.getElementsByClassName("4")
    for(var i = 0; i < this.state.data_filter.length; i += 1) {
        var ans = 1
        if((this.state.data_filter[i].c_a == 1 && !t_a[i].checked) || (this.state.data_filter[i].c_a == 0 && t_a[i].checked)) {
            ans = 0
        }
        if((this.state.data_filter[i].c_b == 1 && !t_b[i].checked) || (this.state.data_filter[i].c_b == 0 && t_b[i].checked)) {
            ans = 0
        }
        if((this.state.data_filter[i].c_c == 1 && !t_c[i].checked) || (this.state.data_filter[i].c_c == 0 && t_c[i].checked)) {
            ans = 0
        }
        if((this.state.data_filter[i].c_d == 1 && !t_d[i].checked) || (this.state.data_filter[i].c_d == 0 && t_d[i].checked)) {
            ans = 0
        }
        if(ans == 1) {
            this.state.score += 10
        }
    }
    this.state.formData.score = this.state.score
    this.state.formData.quiz_no = this.state.qno
    this.state.formData.quiz = this.state.qu
    this.state.formData.username = localStorage.getItem("user")
    this.state.hisData.username = localStorage.getItem("user")
    this.state.hisData.score = this.state.score
    this.state.hisData.quiz = this.state.qu
    this.state.hisData.quiz_no = this.state.qno
    this.state.lData.username = localStorage.getItem("user")
    this.state.lData.score = this.state.score
    this.state.lData.quiz = this.state.qu

    fetch('http://localhost:8080/score', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
   fetch('http://localhost:8080/history', {
    method: 'POST',
    body: JSON.stringify(this.state.hisData),
   })
   fetch('http://localhost:8080/lboard', {
    method: 'POST',
    body: JSON.stringify(this.state.lData),
   })
   this.setState({lifeline: 0})
   this.setState({s2: true})
}

submit3(event) {
    event.preventDefault();
    this.setState({s1 : false})
    this.setState({s2 : false})
}

render() {
    var temp = 1
    var i;

    for(i=0;i<this.state.data_filter.length;i++){
        var count = 0
        this.state.data_filter[i]["Correct"] = "Correct Answer: "
        if(this.state.data_filter[i].c_a == 1) {
            this.state.data_filter[i]["Correct"] += "A"
            count++
        }
        if(this.state.data_filter[i].c_b == 1) {
            this.state.data_filter[i]["Correct"] += "B"
            count++
        }    
        if(this.state.data_filter[i].c_c == 1) {
            this.state.data_filter[i]["Correct"] += "C"
            count++
        }
        if(this.state.data_filter[i].c_d == 1) {
            this.state.data_filter[i]["Correct"] += "D"
            count++
        }
        if(count == 1)
            this.state.data_filter[i]["qtype"]="Single Correct"
        else
            this.state.data_filter[i]["qtype"]="Multiple Correct"
        if(i != 0)
        {
            this.state.data_filter[i]["Correct"] = ""
        }
    }
    if(!this.state.s1) {
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
            <button onClick = {this.submit1}>Submit</button>
            </div> 
        );
        }else if(!this.state.s2 && this.state.lifeline == 0) {
            this.state.lifeline = 0;
            return (
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">{this.state.qu+' Quiz-'+this.state.qno}</h1>
                    </header>
                    <br/><br/>
                    <button type="button" className="btn btn-default" onClick = {this.Life} >Lifeline</button>
                    <form onSubmit={this.submit2}>
                        {this.state.data_filter.map(function(item, key) {
                        return (
                            <p>
                                <h2>Q:{temp} {item.question}</h2>
                                <h4>{item.qtype}</h4>
                                <input type="checkbox" className="1" value="A" name = {temp += 1}/>  {item.option_a}<br></br>
                                <input type="checkbox" className="2" value="B" />  {item.option_b}<br></br>
                                <input type="checkbox" className="3" value="C"/>  {item.option_c}<br></br>
                                <input type="checkbox" className="4" value="D"/>  {item.option_d}<br></br>
                            </p>
                        )
                        })}
                        <button type="submit" className="btn btn-default">Submit</button>
                        <br></br><br></br>
                    </form>
                </div>
            );    

        }else if(!this.state.s2 && this.state.lifeline == 1) {
            return (
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">{this.state.qu+' Quiz-'+this.state.qno}</h1>
                    </header>
                    <br/><br/>
                    <form onSubmit={this.submit2}>
                        {this.state.data_filter.map(function(item, key) {
                        return (
                            <p>
                                <h2>Q:{temp} {item.question}</h2>
                                <h4>{item.qtype}</h4>
                                <h4>{item.Correct}</h4>
                                <input type="checkbox" className="1" value="A" name = {temp += 1}/>  {item.option_a}<br></br>
                                <input type="checkbox" className="2" value="B"/>  {item.option_b}<br></br>
                                <input type="checkbox" className="3" value="C"/>  {item.option_c}<br></br>
                                <input type="checkbox" className="4" value="D"/>  {item.option_d}<br></br>
                            </p>
                        )
                        })}
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </div>
            );    
        }else if(!this.state.s3) {
            return(
                <div className="App">
                <header className="App-header">
                  <h1 className="App-title">{this.state.qu+' Quiz-'+this.state.qno}</h1>
                </header>
                <br/><br/>
                <form onSubmit={this.submit3}>
                <h2>Your Score is : {this.state.score}</h2>
                <button type="submit" className="btn btn-default">Return</button>
                </form>
                </div>
              );
        }    
    }
}
export default Quiz;
