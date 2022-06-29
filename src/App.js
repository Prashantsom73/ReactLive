import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';

import React, { Component,useState } from 'react';
import NewsItem from './components/NewsItem';
import News from './components/News';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class App extends Component {

  // apiKey = process.env.REACT_APP_NEWS_API;
  apiKey = 'f130a42b99a04dd997be3f04e4721cd2';
  
  render() {
  
    return (
      <div>
        <Router>
          <Navbar/>
          <Switch>
   
          <Route exact path="/">
            <News apikey={this.apiKey} key="sport" pageSize={7} country="in" category='sports'/> </Route>
          <Route exact path="/business"><News apikey={this.apiKey} key="business" pageSize={6} country="in" category='business'/></Route>
          <Route exact path="/entertainment"><News apikey={this.apiKey} key="entertainment" pageSize={6} country="in" category='entertainment'/></Route>
          <Route exact path="/general"><News apikey={this.apiKey} key="general" pageSize={6} country="in" category='general'/></Route>
          <Route exact path="/health"><News apikey={this.apiKey} key="health" pageSize={6} country="in" category='health'/></Route>
          <Route exact path="/science"><News apikey={this.apiKey} key="science" pageSize={6} country="in" category='science'/></Route>
          <Route exact path="/technology"><News apikey={this.apiKey} key="technology"  pageSize={6} country="in" category='technology'/></Route>
          
        </Switch>
        </Router>
      </div>
    )
  }
}

