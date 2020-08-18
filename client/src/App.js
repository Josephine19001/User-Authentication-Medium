import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import NavBar from "./component/Navbar";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Home from "./pages/Home"
import { UserRoute } from "./component/privateRoute"

function App() {

  return (
    <Router>
      <NavBar />
      <Route path="/signup" exact>
        <SignUp />
      </Route>
      <Route path="/" exact>
        <SignIn />
      </Route>
      <UserRoute path="/home">
        <Home />
      </UserRoute>
    </Router>
  );
}

export default App;
