import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Nav from "./Components/Nav";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Nav />
      </Router>
    );
  }
}
export default Routes;
