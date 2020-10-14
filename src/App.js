import React, { Component } from 'react';
import './App.css';
import Register from './Components/Register/Register';
import Signin from './Components/Signin/Signin';

const initialState = {
      route: 'signin',
      user: {
        'name':'',
        'email':'',
        'imageurl':''
      },
      friendslist: []
    }

class App extends Component {

      constructor(){
        super();
        this.state = initialState;
      }

       loadUser = (data, friends) => {
        this.setState({
          user: {
            'name':data.name,
            'email':data.email,
            'imageurl':data.imageurl
        },
          friendslist: friends
      })
      }

      onRouteChange = (route) => {
        if(route === 'signout'){
          this.setState(initialState);
        }
        this.setState({route: route});
      }

      render(){
      return (
        <div className="App">
            {
              this.state.route === 'signin'?
              <Signin loadUser = { this.loadUser } onRouteChange = { this.onRouteChange }  />:
              <Register loadUser = { this.loadUser } onRouteChange = { this.onRouteChange }   />
            }
        </div>
      );
    }
    }

export default App;
