import React from "react";

class Form extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
    	cityname: '',
    	errormsg: false
    };
  }

	change = event => {
		this.setState({
			[event.target.name]: event.target.value });
	};

	onGetWeather = () => {
		if(this.state.cityname.length >= 2) {
			const cityName = this.state.cityname;
			this.props.loadWeather(cityName);
		} else {
			this.setState({errormsg: true}); 
			setTimeout(function(){this.setState({errormsg: false});}.bind(this), 3000);
		}
		
	}

	afterEnter = (event) => {
		if(event.charCode === 13) {
			this.onGetWeather();
		}
	}

    render(){
        return(
        	<article >	
			<main className="pa4 black-80 bg-white">
			  	<div className="measure">
			    <fieldset id="add_new" className="ba b--transparent ph0 mh0">
                <div className="mt3 tc">
		        <label className="db fw6 lh-copy f4 tc" htmlFor="cityname">Enter a city name!</label>
		        <input 
		        	className="pa2 input-reset ba tc" 
		        	type="text" 
		        	name="cityname"  
		        	id="cityname"
		        	placeholder="City..."
		        	onChange= {event => this.change(event)}
		        	onKeyPress={this.afterEnter} 
		        	/>
		        <button 
						className='grow f5 link ph3 pv2 dib white bg-light-purple'
						onClick={this.onGetWeather}
						>Submit</button>
		      	</div>
		    	</fieldset>
		    	{this.state.errormsg.length > 0 ? <p className ="tc red">Please enter a city name.</p> : null}
		    	</div>
			</main>
			</article>
        );
    }
}

export default Form;