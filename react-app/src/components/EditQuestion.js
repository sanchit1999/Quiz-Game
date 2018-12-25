import React, { Component } from 'react';
import './EditQuestion.css';

class EditQuestion extends Component {
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
        data: [],
        data_filter: [],
        qu : "",
        qno : 0,
        edit_flag: 0,
    }
    this.handleqChange = this.handleqChange.bind(this);
    this.handleqnChange = this.handleqnChange.bind(this);
    this.handlequChange = this.handlequChange.bind(this);
    this.handleaChange = this.handleaChange.bind(this);
    this.handlebChange = this.handlebChange.bind(this);
    this.handlecChange = this.handlecChange.bind(this);
    this.handledChange = this.handledChange.bind(this);
    this.change_event = this.change_event.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

componentDidMount() {
const request = new Request('http://127.0.0.1:8080/questions');
fetch(request)
    .then(response => response.json())
    .then(data => this.setState({data: data}));
}

handleSubmit(event) {

    this.setState({edit_flag: 0})
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

change_event(event) {
        var t = 'http://127.0.0.1:8080/qu/' + this.state.qu + '/' + this.state.qno + '/' + event.target.value
        const request = new Request(t)
        console.log(t)
        fetch(request)
        .then(response => response.json())
        .then(data_filter => this.setState({data_filter: data_filter}));
        this.setState({edit_flag: 1})
}
handleSubmit(event) {
    var url = 'http://127.0.0.1:8080/ques/' + this.state.qu + '/' + this.state.qno + '/' + 
    fetch(url, 
        )
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
    var val = this
    if(this.state.edit_flag == 0) {
        return (
                <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Edit Questions</h1>
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
                    <th>Edit Question</th>
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
                                <td><button type="submit" className="btn btn-default" value = {item.option_a} onClick = {val.change_event}>Edit</button> </td>
                            </tr>
                    )
                    })}
                </tbody>
            </table> 
            </div> 
        );
        }else{
            return(
                <div className="App">
                  <header className="App-header">
                    <h1 className="App-title">Edit Question</h1>
                 </header>
                <br/><br/>
                <div className="formContainer"> 
                <form onSubmit={val.handleSubmit}>
                    <div className="form-group">
                        <label>Question</label>
                        <input type="text" className="form-control"  onChange={val.handlequChange}/>
                    </div>
                    <div className="form-group">
                        <label>Option A</label>
                        <input type="text" className="form-control"  onChange={val.handleaChange}/>
                    </div>
                    <div className="form-group">
                        <label>Option B</label>
                        <input type="text" className="form-control"  onChange={val.handlebChange}/>
                    </div>
                    <div className="form-group">
                        <label>Option C</label>
                        <input type="text" className="form-control" onChange={val.handlecChange}/>
                    </div>
                    <div className="form-group">
                        <label>Option D</label>
                        <input type="text" className="form-control" onChange={val.handledChange}/>
                    </div>
                    Correct Option(s) : 
                    <br></br><br></br>
                    <label>Option A</label>
                    <input type="checkbox" id = "1" className="form-control" value="correct_a"/>
                    <label>Option B</label>
                    <input type="checkbox" id = "2" className="form-control" value="correct_b"/>
                    <br></br><br></br>
                    <label>Option C</label>
                    <input type="checkbox" id = "3" className="form-control" value="correct_c"/>
                    <br></br><br></br> 
                    <label>Option D</label>
                    <input type="checkbox" id = "4" className="form-control" value="correct_d"/>
                    <br></br><br></br>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form> 
                </div>
                </div>
            );
        }
    }
}
export default EditQuestion;
