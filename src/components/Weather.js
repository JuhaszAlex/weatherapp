import React from "react";

class Weather extends React.Component{
    render(){

    return(

    <div>
        <div className="flex justify-end">
        { this.props.city && <button className='pointer f4 pv2 ph2 link dib white br3 bg-purple'
                              onClick={() => this.props.removeCity()}>Remove</button> }
        </div>
        <div className="fw6">
           {
               this.props.city && <p className="">Location: 
                   <span className="">  {this.props.city}</span>                    
               </p> 
           }
                
           {
                this.props.temperature && <p className="">Temperature: 
                    <span className="">  {this.props.temperature}</span>
                 </p>
            }

            {
                this.props.humidity && <p className="">Humidity: 
                     <span className="">  {this.props.humidity}</span>
                </p>
            }

            {
                this.props.pressure && <p className="">Pressure:  
                     <span className="">  {this.props.pressure}</span>
                </p>
            }

            {
                this.props.speed && <p className="">Wind speed:  
                     <span className="">  {this.props.speed}</span>
                </p>
            }

            {
                this.props.deg && <p className="">Wind direction (deg):  
                     <span className="">  {this.props.deg}</span>
                </p>
            }
        </div>           
    </div>
    )
    }
}

export default Weather;
