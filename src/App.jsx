import { Component } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { calculateFaceLocation } from './services/faceUtils'
import { fetchFaceDetection, updateUserEntries } from './services/api';
import Navigation from './components/Navigation/Navigation'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import getInitialState from './state/initialState'
import './App.css'


class App extends Component {
  constructor() {
    super();
    this.state = getInitialState();
  }

  loadFaceBox(box) {
    this.setState({ box });
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(getInitialState());
    } else if (route === 'home') {
      this.setState({ route: 'home', isSignedIn: true });
    } else {
      this.setState({ route });
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    const { input, user } = this.state;

    fetchFaceDetection(input)
      .then(result => {
        if (result) {
          updateUserEntries(user.id)
            .then(count => {
              this.setState(prevState => ({
                imageUrl: input,
                box: calculateFaceLocation(result),
                user: { ...prevState.user, entries: count }
              }));
            })
        }
      })
      .catch(console.log);
  }

  render() {
    const { isSignedIn, route, imageUrl, box, user } = this.state;
    let PageComponent;

    switch (route) {
      case 'signout':
      case 'signin':
        PageComponent = <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />;
        break;
      case 'register':
        PageComponent = <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />;
        break;
      default:
        PageComponent = (
          <>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </>
        );
    }

    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {PageComponent}
      </div>
    );
  }

}

export default App
