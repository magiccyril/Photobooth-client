import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import App from './App'
import Settings from './Settings'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import '../assets/css/index.css';

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route path="/" exact component={App} />
            <Route path="/settings" component={Settings} />
          </div>
        </Router>
      </Provider>
    )
  }
}