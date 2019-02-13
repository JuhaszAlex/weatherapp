import React, { Component } from 'react';

class Header extends Component {

	signOut = () => {
		this.props.onRouteChange('signin');
	}

	render() {
		return (
		<div className="w-100">
			<div className="dib flex justify-end">
			<nav style={{display: 'flex', justifyContent:'flex-end'}} >
				<p onClick={() => this.signOut()} className='f4 link dim black underline pr4 pointer'>Sign Out</p>
			</nav>
			</div>
			<div className="">
				<h1 className='f1'>Weather App</h1>
				<h3>{this.props.welcome}</h3>
				<div>
					{!this.props.noCityError 
					? <h3>Add a new city to check the local weather</h3>
					: <h3 className ="red">{this.props.noCityError}</h3>}
				</div>
			</div>
		</div>
		);
	}
}

export default Header;