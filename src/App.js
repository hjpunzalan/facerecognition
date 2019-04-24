import React, { Component } from 'react';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageInputLinkForm from './components/ImageInputLinkForm/ImageInputLinkForm';
import './App.css';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import particleconfig from './particleconfig';

const initialState = {
      input: '',
      imageUrl: '',
      box:'{}',
      route:'signin',
      isSignedIn: false,
      user: {
              id: '',
              name: '',
              email: '',
              entries: 0,
              joined: '',
      }
    }

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
}

    loadUser = (data) => {
      this.setState({ user: {
         id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,

        }})}

    calculateFaceLocation = (data) => {

    const clarifaiFace = data.outputs[0].data.regions.map(array => {
      return array.region_info.bounding_box;
    });
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      const output = clarifaiFace.map(regions => {
        return {
        leftCol: regions.left_col * width, //margin from left of image
        topRow: regions.top_row * height,//margin from top of image
        rightCol: width - (regions.right_col * width),//margin from right of image
        bottomRow: height - (regions.bottom_row * height)//margin from bottom of image
        }
      })
      return output;
    }

    displayFaceBox = (box) => { //box will be a border relative to the image based on the position given
      this.setState({box:box});
    }

    onInputChange = (event) => {
      this.setState({input: event.target.value});
    }

    onPictureSubmit = () => {
      this.setState({imageUrl: this.state.input});
      fetch('https://quiet-atoll-12771.herokuapp.com/imageurl', {
              method: 'post',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({
                input: this.state.input
      })
       })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://quiet-atoll-12771.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
      })
       })
      .then(response => response.json())
      .then(count => { //response entries that goes up from server
        this.setState(Object.assign(this.state.user, {entries: count})) // if we refer to user as object we are setstating all the parameters within, but if its just one then we use object assign
      })
      .catch(console.log);
    }
          this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err =>console.log(err));
    }


    onRouteChange = (route) => 
    {
        if (route === 'signout'){ //navigation bar
          this.setState(initialState);
        } else if (route === 'home'){
          this.setState({isSignedIn: true});
        } 
      this.setState({route: route});
        
    }
      componentDidMount() {
        fetch('https://quiet-atoll-12771.herokuapp.com/')
    .then(response => response.json())
    .then(console.log) // dont need a parameter as it will console log all data like this
  }

      render() {
      const { isSignedIn, route, box, imageUrl } = this.state;
        return (
        
     <div className="App">
        <Particles className='particles' params={particleconfig}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
          { route === 'home' 
          ?//Home          
            <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageInputLinkForm 
               onInputChange={this.onInputChange} 
               onPictureSubmit={this.onPictureSubmit}/>
               <FaceRecognition box={box} imageUrl={imageUrl} />
               </div>
          ://Signin + Register 
         (
            route === 'signin'
            ? //Signin
              <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : //Register
             <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            )
           }
           <p className='bottom--2 { bottom: -2rem; }'>Created by: Jonathan P</p>
          </div>
        );
      
      }
    }

    export default App;
