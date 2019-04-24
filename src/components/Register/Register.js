import React from 'react';



class Register extends React.Component {
 constructor(props) { // to use props from App.js we need to pass it
    super();
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState ({password: event.target.value})
  }

  onSubmitRegister = () => {
    fetch('https://facerecognitionhjpunzalan.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type':'application/json'}, // has the dash so it has to be in quotes
      body:JSON.stringify ({ //sending to server has to be in JSON and not javascript object
        // This was set to body for server.js 
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
    .then(response => response.json()) // response before was  'succcess' or 'error logging in'
    .then(user => {
      if (user.id) { 
            this.props.loadUser(user); //in the App component
            this.props.onRouteChange('home');
      }
    })
  }

  render(){
return (
	<article className="w-20 center bg-white br3 pa3 pa4-ns mv ba b--black-10 shadow-5">
    	<main className="pa4 black-80">
      <div className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
            <label className="tl db fw6 lh-copy f6" htmlFor="email-address">Name</label>
            <input 
            onChange={this.onNameChange}
            className="pa2 input-reset ba bg-transparent w-100" 
            type="text" 
            name="name"  
            id="name"/>
          </div>
          <div className="mt3">
            <label className="tl db fw6 lh-copy f6" htmlFor="email-address">Email</label>
            <input
            onChange={this.onEmailChange} 
            className="pa2 input-reset ba bg-transparent w-100" 
            type="email" 
            name="email-address"  
            id="email-address"/>
          </div>
          <div className="mv3">
            <label className="tl db fw6 lh-copy f6" htmlFor="password">Password</label>
            <input 
            onChange={this.onPasswordChange}
            className="b pa2 input-reset ba bg-transparent w-100" 
            type="password" 
            name="password"  
            id="password"/>
          </div>
        </fieldset>
        <div className="">
          <input 
          onClick ={this.onSubmitRegister}
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" 
          type="submit" 
          value="Register"/>
        </div>
      </div>
    </main>
  </article>
);
  }


}

export default Register;

/*
- first we made functions onChange that changes the state of variables: name,email and password
- then we send this information to the server
- then we load our response from server including the user details we just sent and details the server has adjusted and set for us
- we then load the user info using a function from App.js and link to home.
*/