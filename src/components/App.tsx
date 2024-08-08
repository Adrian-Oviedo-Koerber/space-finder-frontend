import React from "react";
import { User } from "../model/Model";
import { AuthService } from "../services/AuthService";
import { Login } from "./Login";
import { Router, Route, Switch } from "react-router-dom";
import History from "../utils/History";
import { Navbar } from "./Navbar";
import { Home } from "./Home";
import { Profile } from "./Profile";

interface AppState {
  user: User | undefined;
}

export class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {user: undefined};
    this.serUser = this.serUser.bind(this);
  }

  private authService: AuthService = new AuthService();

  private serUser(user: User) {
    this.setState({user: user});
  }

  render(){
    return (
      <div className="wrapper">
        <Router history={History}>
          <div>
            <Navbar user={this.state?.user}/>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login">
                <Login authService={this.authService} setUser={this.serUser}/>
              </Route>
              <Route exact path="/profile" component={Profile}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
