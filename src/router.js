import React from "react";
import {HashRouter, Route, Switch } from "react-router-dom";
import Post from "./pages/Post";
import Timeline from "./pages/Timeline";

export default class Router extends React.Component{
  render(){
    return(
      <div>
        <HashRouter>
            <Switch>
              <Route 
                  exact
                  path="/" 
                  component={Post}
              />
              <Route 
                  exact
                  path="/timeline" 
                  component={Timeline}
              />
              <Route 
                  render={()=> <div>Sorry, not page found for this Route!!!</div>}
              />
            </Switch>

        </HashRouter>
      </div>
    )
  }
}
