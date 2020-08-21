import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Components/Nav";
import MyGroup from "./Pages/MyGroup/MyGroup";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/Mygroup" component={MyGroup} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;
