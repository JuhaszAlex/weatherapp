import React, { Component } from 'react';
import Form from "../components/Form";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Weather from "../components/Weather";
import Linechart from "../components/Linechart";
import Modal from 'react-modal';
import './Mainpage.css'

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
    width: 'auto',
    backgroundColor: '#ffffff00',
    outline: 'none',
  }
});


const Api_Key = "2877f503d24cc81bc9fc5f0b4a57f56c";

class Mainpage extends Component {
	constructor(props){
		super(props);
		this.state = {
			info: [false],
      value: 0,
      citynames: [],
      isActive: false,
      username: this.props.username,
      errormsg: ''
		}
	}

  componentWillMount() {
    Modal.setAppElement('body');

    const wDb = localStorage.getItem('weatherDb' + this.state.username);
    if(wDb) {
      const getInfo = JSON.parse(wDb);
      this.setState({info: getInfo});
      const getCitys = getInfo.map(citymap => { 
        return citymap.city})
      const cityNames = Array.from(new Set(getCitys.map(JSON.stringify))).map(JSON.parse);
      this.setState({citynames: cityNames});
    } else {
      console.log('No citys yet');
    }
  }

  componentWillUnmount() {
    this.setState({info: false});
  }

  handleChange = (event, value) => {
    if(value === this.state.citynames.length){
      this.setState({isActive: true});
    } else {
    this.setState({ value });
    }
  };

  handleClose = () => {
    this.setState({ isActive: false });
  };

  getWeather = async (e) => {
    const city = e;
    const wDb = localStorage.getItem('weatherDb' + this.state.username);
    if(wDb) {
      const getInfo = JSON.parse(wDb);
      const filteredCity = getInfo.filter(citymap => {
      return citymap.city.includes(city)})
        if(filteredCity.length > 0) {
            this.setState({isActive: false});
            this.props.noCityError('This city is already presented below.');
        } else {
            const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Api_Key}`);
            const api_call2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=5&appid=${Api_Key}`);
            const response = await api_call.json();
            const response2 = await api_call2.json();
            if(response.main) {
            const dataToAdd = {
              temperature: response.main.temp,
              city: response.name,
              humidity: response.main.humidity,
              pressure: response.main.pressure,
              speed: response.wind.speed,
              deg: response.wind.deg,
              fivedays: response2.list.map(function(el) {
                return Number(el.main.temp);
              })
            }
            getInfo.push(dataToAdd);
            const dataToPush = Array.from(new Set(getInfo.map(JSON.stringify))).map(JSON.parse);
            localStorage.setItem('weatherDb' + this.state.username, JSON.stringify(dataToPush));
            this.setState({info: dataToPush});
            const getCitys = dataToPush.map(citymap => { 
              return citymap.city})
              const cityNames = Array.from(new Set(getCitys.map(JSON.stringify))).map(JSON.parse);
              this.setState({citynames: cityNames});
              this.setState({isActive: false});
              console.log(this.state.info);

            } else {
              this.setState({isActive: false});
              this.props.noCityError('No such city found');
            }
        }
    } else {
        const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${Api_Key}`);
        const api_call2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=5&appid=${Api_Key}`);
        const response = await api_call.json();
        const response2 = await api_call2.json();
        if(response.main) {
        const dataToAdd = {
          temperature: response.main.temp,
          city: response.name,
          humidity: response.main.humidity,
          pressure: response.main.pressure,
          speed: response.wind.speed,
          deg: response.wind.deg,
          fivedays: response2.list.map(function(el) {
             return Number(el.main.temp);
          })
        }
        localStorage.setItem('weatherDb' + this.state.username, JSON.stringify([dataToAdd]));
        this.setState({info: [dataToAdd]});
        this.setState({citynames: [dataToAdd.city]});
        this.setState({isActive: false});
        console.log(this.state.info); 

      } else {
        this.setState({isActive: false});
        this.props.noCityError('No such city found');
      }
    }
  }

  createCoordinates = () => {
    if(this.state.info[this.state.value].fivedays) {
      const temperatures = this.state.info[this.state.value].fivedays
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

  removeCity = () => {
    if(this.state.info.length === 1) {
      this.setState({info: [false]});
      this.setState({citynames: []});
      localStorage.removeItem('weatherDb' + this.state.username);
    } else {
    this.state.info.splice(this.state.value, 1);
    this.state.citynames.splice(this.state.value, 1);
    this.setState({info: this.state.info});
    this.setState({citynames: this.state.citynames});
    this.setState({value: this.state.citynames.length-1});
    const dataToPush = Array.from(new Set(this.state.info.map(JSON.stringify))).map(JSON.parse);
    localStorage.setItem('weatherDb' + this.state.username, JSON.stringify(dataToPush));

    console.log(this.state.citynames);
    }
  }

  render() {

    const { classes } = this.props;
    const { value } = this.state;


   	return (
    <div className="Mainpage">
      <div className="col-sm-12">
        <Modal {...this.props} isOpen={this.state.isActive} onRequestClose={() => this.handleClose()}
            className="Modal br3 bg-white b--black-10 mt2 w-100 w-50-m mw6 shadow-2 center"
          open={this.state.isActive} 
          onClose={this.handleClose}
          {...this.props}>
            <Form
             loadWeather={(el) => this.getWeather(el)}/>
        </Modal>
      </div>
          <div className={classes.root}>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange}>
              {this.state.citynames.map((name, i) => <Tab label={name} key={i}/>)}
              <Tab style={{fontSize: 30,}} label={'+'} />          
            </Tabs>
          </AppBar> 
          <TabContainer>
            <div className="dib w-100">
            <Weather
              removeCity={this.removeCity}
              temperature={this.state.info[this.state.value].temperature}
              city={this.state.info[this.state.value].city}
              humidity={this.state.info[this.state.value].humidity}
              pressure={this.state.info[this.state.value].pressure}
              speed={this.state.info[this.state.value].speed}
              deg={this.state.info[this.state.value].deg}
              />            
            {this.state.info[this.state.value].city 
            ? <Linechart
                 data={this.createCoordinates()}
                 />
            : null
            }
            </div>
          </TabContainer>
        </div>
    </div>
	);
  }
}

Mainpage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Mainpage);
