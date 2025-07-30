import { Component } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import BasicParticles from './components/Particles/BasicParticles'
import Navigation from './components/Navigation/Navigation'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css'


// /////////////////////////////////////////////////////////////////////////////////////////////////
// In this section, we set the user authentication, user and app ID, model details, and the URL
// of the image we want as an input.Change these strings to run your own example.
// ////////////////////////////////////////////////////////////////////////////////////////////////

// Your PAT (Personal Access Token) can be found in the Account's Security section
const PAT = 'dd8d4919a3c048f68411e5d7d2f0ef09';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'jagaesh';
const APP_ID = 'smartbrain-face-detection';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
// const MODEL_ID = 'color-recognition';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';
// const MODEL_VERSION_ID = 'dd9458324b4b45c2be1a7ba84d27cd04';
const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';


const buildClarifaiRequestOptions = (imageUrl) => {
  // const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": imageUrl
            // "base64": IMAGE_BYTES_STRING
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions
}


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

  calculateFaceLocation = (result) => {
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);

    const regions = result.outputs[0].data.regions;

    const faceBoxes = regions.map(region => {
      // Accessing and rounding the bounding box values
      const boundingBox = region.region_info.bounding_box;
      return {
        topRow: boundingBox.top_row * height,
        leftCol: boundingBox.left_col * width,
        bottomRow: height * (1 - boundingBox.bottom_row),
        rightCol: width * (1 - boundingBox.right_col)
      }
    });

    return faceBoxes[0];
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

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const clarifaiUrl = `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`;
    const requestOptions = buildClarifaiRequestOptions(this.state.input);

    fetch(proxyUrl + clarifaiUrl, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
          this.loadFaceBox(this.calculateFaceLocation(result));
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
