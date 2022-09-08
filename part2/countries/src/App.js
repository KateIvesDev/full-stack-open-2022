import { useState, useEffect } from 'react'
import Search from './components/search'
import CountryDisplay from './components/countrydisplay'
import axios from 'axios'


const App = () => {
  const [ countries, setCountries ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  
 
  useEffect(() => {
    console.log('effect')
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
      
  }, [])


const handleSearch = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
}

let showCountries = newFilter 
    ? countries.filter((country) => 
    country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
    : ''


  return(
    <>
      <div>
      <Search 
        value={newFilter} 
        onChange={handleSearch} 
        text='search countries '/>
      </div>
     <div>
        {showCountries.length <= 10
         ? <CountryDisplay showCountries={showCountries} newFilter={newFilter} setNewFilter={setNewFilter} />
         : 'Too many matches'
        }
        
     </div>
      
    </>
    
  )
}

export default App;
