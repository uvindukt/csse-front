import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./css/App.css";
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import { bake_cookie, read_cookie, delete_cookie } from "sfcookies";
import User from "./components/User";
import Inventory from "./components/Inventory";
import Order from "./components/Order";

class App extends Component {

  constructor(props) {
    super(props);
    if (read_cookie("session").isAuthenticated) {
      const cookie = read_cookie("session");
      this.state = {
        isAuthenticated: cookie.isAuthenticated,
        user: cookie.user,
        token: cookie.token,
        type: cookie.type
      };
    } else {
      this.state = {
        isAuthenticated: false,
        user: null,
        token: null,
        type: null
      };
    }
  }

  login = session => {
    let { user, token, type } = session;
    bake_cookie("session", { isAuthenticated: true, user, token, type });
    this.setState({
      isAuthenticated: true,
      user,
      token,
      type
    });
  };

  logout = () => {
    delete_cookie("session");
    this.setState({
      isAuthenticated: false,
      user: null,
      token: null,
      type: null
    });
  };

  render() {

    return (
        <Router>
          <div>
            <NavigationBar session={this.state} logout={this.logout}/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login" render={props => (
                  <SignIn {...props} session={this.state} login={this.login}/>
              )}/>
              <Route exact path="/profile" render={props => (
                  <Profile {...props} session={this.state} login={this.login}/>
              )}/>
              <Route exact path="/user" render={props => (
                  <User {...props} session={this.state}/>
              )}/>
              <Route exact path="/inventory" render={props => (
                  <Inventory {...props} session={this.state}/>
              )}/>
              <Route exact path="/order" render={props => (
                  <Order {...props} session={this.state}/>
              )}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </Router>
    );
  }
}

export default App;