import React, { Component } from 'react';
import Signin from './components/Signin';
import Mainpage from './components/Mainpage';
import Header from './components/Header';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state= {
      route: 'signin',
      welcome: '',
      username: '',
      nocityerror: false
    }
  }

  componentWillMount() {
    const lastAccount = localStorage.getItem('lastAccount');
    if(lastAccount) {
      const cacheAccount = JSON.parse(lastAccount)
      this.setState({route: 'main'});
      this.setState({welcome: 'Welcome back ' + cacheAccount.name});
      this.setState({username: cacheAccount.name});
    }
  }

  noCityError = (text) => {
    this.setState({nocityerror: text});
    setTimeout(function(){this.setState({nocityerror: false});}.bind(this), 3000);
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  loadUser = (value) => {
    let getAccount = localStorage.getItem('account');
    if(getAccount) {
      const getInfo = JSON.parse(getAccount);
      for(let i=0; i < getInfo.length; i++) {
        if(getInfo[i].name === value.name &&
            getInfo[i].password === value.password) {
            this.setState({route: 'main'});
            this.setState({welcome: 'Welcome back again ' + value.name});
            this.setState({username: value.name});
            localStorage.setItem('lastAccount', JSON.stringify(value));
        } 
      } 
    } else {
      console.log('Wrong username or password.');
    }
  }

  registerUser = (value) => {
    let getAccount = localStorage.getItem('account');
    if(getAccount) {
    const getInfo = JSON.parse(getAccount);
    const filteredUsers = getInfo.filter(user => {
      return user.name.includes(value.name)})
        if(filteredUsers.length > 0) {
            console.log('Username is already in use.');
        } else {
            getInfo.push(value);
            const dataToPush = Array.from(new Set(getInfo.map(JSON.stringify))).map(JSON.parse);
            localStorage.setItem('account', JSON.stringify(dataToPush));
            this.setState({route: 'main'});
            this.setState({welcome: 'Welcome new user ' + value.name});
            this.setState({username: value.name});
            localStorage.setItem('lastAccount', JSON.stringify(value));
        }
    
    } else {
            localStorage.setItem('account', JSON.stringify([value]));
            this.setState({route: 'main'});
            this.setState({welcome: 'Welcome new user ' + value.name});
            this.setState({username: value.name});
            localStorage.setItem('lastAccount', JSON.stringify(value));
    }
  }

  render() {
    return (
      <div className="App">
      {this.state.route === 'main'
        ? <div>
                <Header 
                        onRouteChange={this.onRouteChange} 
                        welcome={this.state.welcome}
                        noCityError={this.state.nocityerror}
                />
                <Mainpage 
                        noCityError={this.noCityError}
                        username={this.state.username}
                />
          </div>
        : <Signin loadUser={this.loadUser}
                  registerUser={this.registerUser}
          />
        }
      </div>
    );
  }
}

export default App;
