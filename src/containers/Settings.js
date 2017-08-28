import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import { setSocketUri, socketConnect } from '../actions/SocketActions'
import { setTimerLength } from '../actions/TimerActions'

import '../assets/css/Settings.css';

class Settings extends Component {
  constructor(props) {
    super(props)
    this.handleSocketChange = this.handleSocketChange.bind(this)
    this.handleSocketConnection = this.handleSocketConnection.bind(this)
    this.handleTimerLengthChange = this.handleTimerLengthChange.bind(this)
  }
  
  handleSocketChange(e) {
    this.props.dispatch(setSocketUri(e.target.value))
  }
  
  handleSocketConnection(e) {
    e.preventDefault()
    this.props.dispatch(socketConnect())
  }
  
  handleTimerLengthChange(e) {
    e.preventDefault()
    this.props.dispatch(setTimerLength(e.target.value))
  }

  render() {
    return (
      <div className="SettingsScreen">
        <form>
          <h2>Paramètres</h2>
          <div className="form-group">
            <label htmlFor="input-server">Serveur</label>
            <input type="text" id="input-server" value={this.props.socketURI} onChange={this.handleSocketChange}/>
            <button onClick={this.handleSocketConnection} className="tryConnection">Tester</button>
            { this.props.socketConnected && <span className="badge badgeConnected">Connecté</span> }
            { !this.props.socketConnected && <span className="badge badgeDisconnected">Déconnecté</span> }
          </div>
          
          <div className="form-group">
            <label htmlFor="input-timer-length">Durée du retardateur</label>
            <select id="input-timer-length" value={this.props.timerLength} onChange={this.handleTimerLengthChange}>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="30">30</option>
            </select>
          </div>
        
          <Link to='/' className="close">Retour</Link>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    socketURI: state.socket.uri,
    socketConnected: state.socket.connected,
    timerLength: state.timer.length,
  }
}

export default connect(mapStateToProps)(Settings)