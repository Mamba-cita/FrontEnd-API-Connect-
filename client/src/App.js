import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddEdit from "./pages/AddEdit";

import Home from "./pages/Home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <Route>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/AddContact" component={AddEdit} />
            <Route path="/edit/:id" component={AddEdit} />
          </Switch>
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;

/*

    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        <Switch>
        <Router>
          <Route exact path="/" component={About} />
          </Router>
        </Switch>
      </div>
    </BrowserRouter>

*/
