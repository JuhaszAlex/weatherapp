import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, } from 'recharts';

class Linechart extends Component {
render() {
	return (
	<div>
		<h3>Five day forecast of daily temperatures:</h3>
		<div className="flex justify-center">
		<ResponsiveContainer width='60%' aspect={4.0/2.5}>
		<LineChart data={this.props.data}>
  			<Line type="monotone" dataKey="uv" stroke="#8884d8" />
  			
  			<CartesianGrid stroke="#ccc" />
  			<XAxis dataKey="pv"/>
  			<YAxis />
		</LineChart>
		</ResponsiveContainer>
		</div>
	</div>
		);
	}
}
export default Linechart;                              