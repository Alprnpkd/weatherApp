import React from 'react';

import { useState,useEffect } from 'react';
import moment from 'moment';
import {WiHumidity,WiStrongWind} from'react-icons/wi' ;





const City = ({city}) => {
   
 
    const temp = city.main.temp;
    const roundedTemp = Math.ceil(temp);
  
    const windSpeed = city.wind.speed * 3.6;
    const roundedSpeed = Math.ceil(windSpeed);
      
    

  
   
    // Hava durumu koşulları için ikon dosyalarının bulunduğu klasör yolunu belirleyin
    const iconsPath = "src/images/";
  
  
  
    const iconMap = {
      "Clouds": {day: "cloudy-2-day.svg", night: "cloudy-2-night.svg"},
      "Clear": {day: "clear-day.svg", night: "clear-night.svg"},
      "Rain": {day: "rainy-1-day.svg", night: "rainy-1-night.svg"},
      "Snow": {day: "snowy-1-day.svg", night: "snowy-1-night.svg"},
      "Thunderstorm": {day: "thunderstorm-day.svg", night: "thunderstorm-night.svg"},
      "Drizzle": {day: "drizzle-day.svg", night: "drizzle-night.svg"},
      "Mist": {day: "fog-day.svg", night: "fog-night.svg"},
      "Smoke": {day: "smoke-day.svg", night: "smoke-night.svg"},
      "Haze": {day: "haze-day.svg", night: "haze-night.svg"},
      "Dust": {day: "dust-day.svg", night: "dust-night.svg"},
      "Fog": {day: "fog-day.svg", night: "fog-night.svg"},
      "Sand": {day: "sand-day.svg", night: "sand-night.svg"},
      "Ash": {day: "ash-day.svg", night: "ash-night.svg"},
      "Squall": {day: "squall-day.svg", night: "squall-night.svg"},
      "Tornado": {day: "tornado-day.svg", night: "tornado-night.svg"}
    };
    const localTime = new Date();
const utcOffset = localTime.getTimezoneOffset() / 60;
const localHour = localTime.getUTCHours() + city.timezone / 3600 + utcOffset;
const localMinute = localTime.getUTCMinutes();


    
    const now = new Date();
    const sunriseUTC = new Date(city.sys.sunrise * 1000);
    const sunsetUTC = new Date(city.sys.sunset * 1000);

    
    
    const sunrise = moment.unix(city.sys.sunrise).utcOffset(city.timezone / 60).format('HH:mm');
const sunset = moment.unix(city.sys.sunset).utcOffset(city.timezone / 60).format('HH:mm');
    
    const isDay = now > sunriseUTC && now < sunsetUTC;
    
    const iconFileName = iconMap[city.weather[0].main][isDay ? "day" : "night"];

  
    const [localtime, setLocalTime] = useState(moment().utcOffset(city.timezone / 60).format('HH:mm:ss'));
  
    useEffect(() => {
      // setInterval kullanarak state'i güncelleyin
      const intervalId = setInterval(() => {
        setLocalTime(moment().utcOffset(city.timezone / 60).format('HH:mm'));
      }, 1000); // 1 saniye aralıklarla güncelleme yapacak
  
      // Component unmount olduğunda setInterval'i temizle
      return () => clearInterval(intervalId);
    }, [city.timezone]);
  
    //win speed km/sa convert
    const windSpeedKmh = Math.round(city.wind.speed * 3.6);

    return (
      
      
        <div className='Weathercard'>
          {}
          <div className="col-1">
            <div className=''>
              <p className='cityname'>{city.name}</p>
            </div>
            <div className='clock'>
            <p className='localtime'> {localtime}</p>
            {/* <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p> */}
            </div>
            </div>
            
            <div className="weatherimg">
              
              <img src={iconsPath + iconFileName} alt={city.weather[0].description} />
              <p className='desc'>{city.weather[0].description}</p>
            </div>
            <div className='weatherinfo'>
              <div className="weathervalues">
                <span><WiStrongWind className='speedicon'/>{windSpeedKmh}km/sa </span>
              <span><WiHumidity className='humiicon'/>{city.main.humidity}%</span>
              </div>
              <div className="weathertemp">
                <h1 className='temp'>{roundedTemp}°C</h1>
              </div>
            </div>
          
        </div>
      
    )
  }

export default City;