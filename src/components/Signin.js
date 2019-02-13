import React from 'react';

class Signin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			password: '',
			errormsg: false
		}
	}

	change = event => {
		this.setState({
			[event.target.name]: event.target.value });
	};

	onSubmitSignIn = () => {
		if(this.state.name && this.state.password) {
			const userInfo = {
			name: this.state.name, password: this.state.password};
			this.props.loadUser(userInfo);
		} else {
			this.setState({errormsg: 'Enter your username and password please'}); 
			setTimeout(function(){this.setState({errormsg: false});}.bind(this), 3000);
		}
		
	}

	onSubmitRegister = () => {
		if(this.state.name && this.state.password) {
			const userInfo = {
			name: this.state.name, password: this.state.password};
			this.props.registerUser(userInfo);
		} else {
			this.setState({errormsg: 'Enter your username and password please'}); 
			setTimeout(function(){this.setState({errormsg: false});}.bind(this), 3000);
		}
	}

	afterEnter = (event) => {
		if(event.charCode === 13) {
			this.onSubmitSignIn();
		}
	}

	render() {
	return (
	<article className="br3 ba b--black-10 mv4 w-100 w-50-m mw6 shadow-2 center">	
		<main className="pa4 black-80">
		  <div className="measure">
		    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
		      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
		      <div className="mt3">
		        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
		        <input 
		        	className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        	type="text" 
		        	name="name"  
		        	id="name"
		        	onChange= {event => this.change(event)}
		        	onKeyPress={this.afterEnter} 
		        	/>
		      </div>
		      <div className="mv3">
		        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
		        <input 
		        	className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
		        	type="password" 
		        	name="password"  
		        	id="password"
		        	onChange= {event => this.change(event)}
		        	onKeyPress={this.afterEnter} 
		        	/>
		      </div>
		    </fieldset>
		    <div>
		      <input
		      	  onClick={this.onSubmitSignIn}
			      className="b ph3 mh2 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" 
			      value="Sign in" 
		      />
		      <input
		      	  onClick={this.onSubmitRegister}
			      className="b ph3 mh2 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
			      type="submit" 
			      value="Register" 
		      	/>
		    </div>
		    {this.state.errormsg.length ? <p className ="tc red">{this.state.errormsg}</p> : null}
		  </div>
		</main>
	</article>	
	);
	}

	
}

export default Signin;