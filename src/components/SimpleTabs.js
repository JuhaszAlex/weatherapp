import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Weather from "../components/Weather";
import Linechart from "../components/Linechart";
//import Customtab from "../components/Customtab";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {
  constructor(props) {
  super(props);
    this.state = {
    value: 0,
    citys: [{temperature: this.props.temperature},
                      {city: this.props.city},
                      {humidity: this.props.humidity},
                      {pressure: this.props.pressure},
                      {speed: this.props.speed},
                      {deg: this.props.deg},
                      {fivedays: this.props.fivedays}
                      ],
    citynames: [this.props.city]
    };
  }
  

  handleChange = (event, value) => {
    this.setState({ value });
  };

  componentWillMount() {
    const wDb = localStorage.getItem('weatherDb');
    if(wDb) {
      const getInfo = JSON.parse(wDb);
      this.setState({citys: getInfo});
      const getCitys = getInfo.map(citymap => { 
        return citymap.city})
      const cityNames = Array.from(new Set(getCitys.map(JSON.stringify))).map(JSON.parse);
      this.setState({citynames: cityNames});
    } else {
      console.log('No citys yet');
    }
  }

  refreshState = () => {
    this.setState({citys: this.props.info});
  }

  componentDidUpdate() {

    console.log(this.state.citys);
    console.log(this.state.citynames);
  }

 // {value === 0 && <TabContainer>Item One</TabContainer>}
 // <Customtab tabnames={this.props.city}/>

  createCoordinates = () => {
    if(this.state.citys[this.state.value].fivedays) {
      const temperatures = this.state.citys[this.state.value].fivedays
      const z = []
        for(let i = 1; i <= temperatures.length; i++) {
        z.push(i)
      }

      const data = []
        for(let i = 0; i < temperatures.length; i++) {
        const pv = z[i]
        const uv = temperatures[i]
        data.push({pv, uv})
      }
      return data;
    }else {
      return null;
    }
  }

  render() {

    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            {this.state.citynames.map((name, i) => <Tab label={name} key={i}/>)}
          </Tabs>
        </AppBar> 
        <TabContainer {...this.props}>
        {this.state.citys
          ? <Weather  temperature={this.state.citys[this.state.value].temperature}
                    city={this.state.citys[this.state.value].city}
                    humidity={this.state.citys[this.state.value].humidity}
                    pressure={this.state.citys[this.state.value].pressure}
                    speed={this.state.citys[this.state.value].speed}
                    deg={this.state.citys[this.state.value].deg}
                    error={this.state.citys[this.state.value].error}/>
          : null
        }
          {this.state.citys[this.state.value].city 
            ? <Linechart data={this.createCoordinates()}/>
            : null
          }
        </TabContainer>
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);