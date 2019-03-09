import React from 'react';



class Signin extends React.Component {
  constructor(props) { // to use props from App.js we need to pass it
    super();
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState ({signInPassword: event.target.value})
  }

  onSubmitSignIn = () => {
    fetch('https://quiet-atoll-12771.herokuapp.com/signin', {
      method: 'post',
      headers: {'Content-Type':'application/json'}, // has the dash so it has to be in quotes
      body:JSON.stringify ({ //sending to server has to be in JSON and not javascript object
        // This was set to body from server.js root from database
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(response => response.json()) // response before was  'succcess' or 'error logging in'
    .then(user => {
      if (user.id) { //case sensitive
            this.props.loadUser(user);
            this.props.onRouteChange('home');
      }
    })
  }

	render () {
  const {onRouteChange} = this.props // fpr register link
return (
        <article className="w-20 center bg-white br3 pa3 pa4-ns mv ba b--black-10 shadow-5">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
                  onClick ={this.onSubmitSignIn}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" 
                  type="submit" 
                  value="Sign in"/>
                </div>
                <div className="lh-copy mt3">
                  <p 
                  onClick ={() => onRouteChange('register')}
                  className="pointer f6 link dim black db">Register</p>
              </div>
            </div>
         </main>
       </article>
		  );
  }
}

export default Signin;