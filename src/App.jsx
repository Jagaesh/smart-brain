import { Component } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { calculateFaceLocation } from './services/faceUtils'
import { fetchFaceDetection, updateUserEntries } from './services/api';
import BasicParticles from './components/Particles/BasicParticles'
import Navigation from './components/Navigation/Navigation'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css'


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadFaceBox(box) {
    this.setState({ box: box });
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
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    fetchFaceDetection(this.state.input)
      .then(result => {
        if (result) {
          updateUserEntries(this.state.user.id)
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
          this.loadFaceBox(calculateFaceLocation(result));
        }
      })
      .catch(error => console.log('error', error));
  }

  render() {
    const { isSignedIn, route, imageUrl, box, user } = this.state;
    let PageComponent;

    switch (route) {
      case 'signout':
      case 'signin':
        PageComponent = <SignIn
          loadUser={this.loadUser}
          onRouteChange={this.onRouteChange}
        />;
        break;
      case 'register':
        PageComponent = <Register
          loadUser={this.loadUser}
          onRouteChange={this.onRouteChange}
        />;
        break;
      default:
        PageComponent = (
          <>
            <Logo />
            <Rank
              name={user.name}
              entries={user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              imageUrl={imageUrl}
              box={box}
            />
          </>
        );
    }

    return (
      <div className="App">
        <BasicParticles />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {PageComponent}
      </div>
    );
  }

}

export default App
