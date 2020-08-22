import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Components/Nav";
import MyGroup from "./Pages/MyGroup/MyGroup";
import MyPage from "./Pages/MyPage/MyPage";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/Mygroup" component={MyGroup} />
          <Route exact path="/MyPage" component={MyPage} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;
