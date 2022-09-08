import CountryView from './countryview'

const CountryDisplay = ( {showCountries, newFilter, setNewFilter, weather, setWeather } ) => {
    
    const handleClick = (event) => {
       setNewFilter(event.target.parentElement.getAttribute("id"))
       console.log(newFilter)
    }

    return(
        <>
            {newFilter && 
                <div>
                    {showCountries.map(country => 
                    <p key={country.name.common} id={country.name.common}>{country.name.common} <button onClick={handleClick}>Show</button></p>)
                    }
                    <div>{ showCountries.length === 1
                            ? <CountryView country={showCountries[0]} weather={weather} setWeather={setWeather}/>
                            : ''
                        }
                    </div>
                </div>
                
            }
        </>
        
    )
    
  
}

export default CountryDisplay