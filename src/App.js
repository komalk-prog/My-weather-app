import './App.css';
import React from 'react'
import dateFormat from 'dateformat';
import {Search,Wind, MapPin} from "react-feather";
import getweather from './api';
import { useState } from 'react';

function App() {
  
  const [city,setCity]=useState("");
  const [weather,setWeather]=useState({});

  const getWeatherbyCity=async()=>{
      const weatherData=await getweather(city);
      setWeather(weatherData);
      setCity("");
  }

  const renderDate=()=>{
    let now=new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  }
  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="input-wrapper">
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} 
        placeholder='Enter City Name' />
        <button onClick={()=>getWeatherbyCity()}>
          <Search></Search>
        </button>
      </div>

      
    {weather && weather.weather && 
        <div className='content'>
            <div className='location d-flex'>
                <MapPin></MapPin>
                <h2>{weather.name} <span>{`{${weather.sys.country}}`}</span></h2>
            </div>
          <p className='datetext'>{renderDate()}</p>

            <div className='waetherdesc d-flex flex-c'>
                <img 
                  src={` https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} 
                  alt=""
                  height={"100px"}
                  width={"100px"}
                  />
                <h3>{weather.weather[0].description}</h3>
            </div>

            <div className="tempstats d-flex flex-c">
                <h1> {weather.main.temp} <span>&deg;C</span></h1>
                <h2>Feels like {weather.main.feels_like}<span>&deg;C</span></h2>
            </div>

            <div className='windstats d-flex'>
                <Wind></Wind>
                <h3>Wind is {weather.wind.speed} knots in {weather.wind.deg}&deg;</h3>
            </div>
      </div>
    }

    {!weather.weather &&
      <div className='content'>
        <h4>No Data Found !</h4>
      </div>
    }
    {/* {<p>{JSON.stringify(weather)}</p>} */}
    </div>
  )

}

export default App;
