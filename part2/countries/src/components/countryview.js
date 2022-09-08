import { useEffect, useState } from 'react'
import axios from 'axios'

const CountryView = ( { country } ) => {

  const [weather, setWeather] = useState('')

    useEffect(() => {
      console.log('effect')
      console.log('effect')
      const apiKey = process.env.REACT_APP_API_KEY
        const capitalCity = country.capital
      
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&units=imperial&appid=${apiKey}`)
        .then(response => {
          console.log('promise fulfilled')
          setWeather(response.data)
        })
        
    }, [country])
    
    const temp = weather ? weather.main.temp : ''
    const wind = weather ? weather.wind.speed : ''
    const icon = weather ? weather.weather[0].icon : ''
    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png` 
    

    return (
        <div key={country.name.common}>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>
            <p>Languages:</p>
            <ul>
                {Object.keys(country.languages).map((obj, i) => 
                <li key={country.languages[obj]}>{country.languages[obj]}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.name.common + ' flag'} width='100px'></img>
            <h3>Weather in {country.capital}</h3>
              <p>Current Temperature: {temp}  Farenheit</p>
              <img src={iconUrl} alt="weather icon" width='100px'></img>
              
              <p>Wind Speed: {wind} miles/hour</p> 
        </div>
        )   

}
export default CountryView