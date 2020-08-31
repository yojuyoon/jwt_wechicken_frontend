import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Components/Nav";
import Main from "./Pages/Main/Main";
import MyGroup from "./Pages/MyGroup/MyGroup";
import MyPage from "./Pages/MyPage/MyPage";
import Loading from "./Components/Loading/Loading";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/Mygroup" component={MyGroup} />
          <Route exact path="/MyPage" component={MyPage} />
          <Route exact path="/Main" component={Main} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;
