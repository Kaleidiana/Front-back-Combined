import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar'; // Ensure you have a Navbar component
import Home from './Components/Home'; // Ensure you have a Home component
import Login from './Components/Register'; // Import Login component
import Signup from './Components/Login'; // Import Signup component
import AddUser from './Components/Adduser'; // Import AddUser component
import NotFound from './Components/NotFound'; // Ensure you have a NotFound component

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='content'>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/register">
              <Login />
            </Route>
            <Route path="/login">
              <Signup />
            </Route>
            <Route path="/adduser">
              <AddUser />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
