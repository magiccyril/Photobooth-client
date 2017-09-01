import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import { reset } from '../actions/AppActions'
import { requestPhoto } from '../actions/PhotoActions'
import { startTimer, stopTimer } from '../actions/TimerActions'
import { socketConnect } from '../actions/SocketActions'

import Header from '../components/Header.js'

import '../assets/css/App.css';

import iconPhoto from '../assets/img/icon-photo.svg'
import iconRestart from '../assets/img/icon-restart.svg'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleRestart = this.handleRestart.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  
  componentDidMount() {
    this.props.dispatch(socketConnect())
  }

  handleRestart() {
    this.props.dispatch(reset())
  }

  handleStart() {
    this.props.dispatch(startTimer(requestPhoto))
  }
  
  handleCancel() {
    this.props.dispatch(stopTimer())
  }

  render() {
    return (
      <div className="App">
        <div className="flower"></div>
        { this.props.showStart &&
          <section className="startScreen">
            <Header />
            { this.props.socketConnected && <button onClick={this.handleStart}><img src={iconPhoto} alt="" /> Prendre une photo</button> }
            { !this.props.socketConnected && <span>Problème de connexion avec le serveur</span> }
            <Link to='/settings' className="settings">Paramètres</Link>
          </section>
        }

        { this.props.showTimer &&
          <section className="timerScreen">
            <h1>{ this.props.timer }</h1>
            {this.props.isCancelable && <button onClick={this.handleCancel}>Annuler</button> }
          </section>
        }

        { this.props.showResult &&
          <section className="resultScreen">
            <img src={ this.props.photo } alt="" className="resultPhoto" />
            <button onClick={this.handleRestart}><img src={iconRestart} alt="" /> Nouvelle photo</button>
          </section>
        }
        
        { this.props.showError &&
          <section className="errorScreen">
            <h1>Oups,<br />une erreur est survenue !</h1>
            <button onClick={this.handleRestart}><img src={iconRestart} alt="" /> Recommencer</button>
          </section>
        }
      </div>
    );
  }
}

const getCurrentTimer = (state) => {
  if (state.timer.running) {
    return state.timer.count;
  }
  
  if (state.photo.pending && !state.photo.processing) {
    return 'Souriez :)';
  }
  
  if (state.photo.pending && state.photo.processing) {
    return 'Traitement';
  }
}

const mapStateToProps = (state) => {
  return {
    showStart: !state.photo.error && !state.timer.running && !state.photo.pending && !state.photo.path,
    showTimer: !state.photo.error && (state.timer.running || state.photo.pending) && !state.photo.path,
    showResult: !state.photo.error && !state.timer.running && !state.photo.pending && state.photo.path,
    showError: state.photo.error,
    
    socketConnected: state.socket.connected,
    
    timer: getCurrentTimer(state),
    isCancelable: !state.photo.pending,
    
    photo: 'http://' + state.socket.uri + state.photo.path,
  }
}

export default connect(mapStateToProps)(App)