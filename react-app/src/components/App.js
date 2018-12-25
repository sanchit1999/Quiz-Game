import React, { Component } from 'react';
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Logout from "./Logout"
import CreateQuiz from "./CreateQuiz"
import ViewUsers from "./ViewUsers"
import DeleteUsers from "./DeleteUsers"
import ViewQuiz from "./ViewQuiz"
import DeleteQuiz from "./DeleteQuiz"
import DQuiz from "./DQuiz"
import Quiz from "./Quiz"
import History from  "./History"
import LeaderBoard from "./LeaderBoard"
import EditQuestion from "./EditQuestion"

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class App extends Component {
  render() {
    if(localStorage.getItem("admin") == "1") {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>GQuiz</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/'}>Admin</Link></li>
                  <li><Link to={'/createquiz'}>Createquiz</Link></li>
                  <li><Link to = {'/viewusers'}>View Users</Link></li>
                  <li><Link to = {'/DeleteUsers'}>Delete Users</Link></li>
                  <li><Link to = {'/viewquiz'}>View Quiz</Link></li>
                  <li><Link to = {'/DeleteQuiz'}>Delete Questions</Link></li>
                  <li><Link to = {'/DQuiz'}>Delete Quiz</Link></li>
                  <li><Link to = {'/LeaderBoard'}>LeaderBoard</Link></li>
                  <li><Link to = {'/EditQuestion'}>EditQuestion</Link></li>                  
                  <li><Link to={'/Logout'}>Logout</Link></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/CreateQuiz' component={CreateQuiz} />
                 <Route exact path='/ViewUsers' component={ViewUsers} />
                 <Route exact path='/DeleteUsers' component={DeleteUsers} />
                 <Route exact path='/ViewQuiz' component={ViewQuiz} />
                 <Route exact path='/DeleteQuiz' component={DeleteQuiz} />
                 <Route exact path='/LeaderBoard' component={LeaderBoard} />
                 <Route exact path='/EditQuestion' component={EditQuestion} />
                 <Route exact path='/DQuiz' component={DQuiz} />  

                 <Route exact path='/Logout' component={Logout} />
            </Switch>
          </div>
        </Router>
      </div>
    );} else if(localStorage.getItem("login") == "1") {
      return (
        <div>
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to={'/'}>GQuiz</Link>
                  </div>
                  <ul className="nav navbar-nav">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/Quiz'}>Play Quiz</Link></li>
                    <li><Link to={'/History'}>Player History</Link></li>
                    <li><Link to = {'/LeaderBoard'}>LeaderBoard</Link></li>
                    <li><Link to={'/Logout'}>Logout</Link></li>
                  </ul>
                </div>
              </nav>
              <Switch>
                   <Route exact path='/' component={Home} />
                   <Route exact path='/Quiz' component={Quiz} />
                   <Route exact path='/History' component={History} />
                   <Route exact path='/LeaderBoard' component={LeaderBoard} />
                   <Route exact path='/Logout' component = {Logout}/>
              </Switch>
            </div>
          </Router>
        </div>
      );
    }else{
      return (
        <div>
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to={'/'}>GQuiz</Link>
                  </div>
                  <ul className="nav navbar-nav">
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/signup'}>Signup</Link></li>
                    <li><Link to={'/login'}>Login</Link></li>
                  </ul>
                </div>
              </nav>
              <Switch>
                   <Route exact path='/' component={Home} />
                   <Route exact path='/signup' component={Signup} />
                   <Route exact path='/login' component={Login} />
              </Switch>
            </div>
          </Router>
        </div>
      );
    }
  }
}

export default App;
