import React, { Component } from 'react';
import './App.css';
import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import Post from './components/Post';
import * as config from './config.json';

Amplify.configure(config);

class App extends Component {

  render() {
    return (
      <div>
        <Post />
      </div>
    );
  }
}

export default withAuthenticator(App);
