import { useState, useEffect } from 'react'
import Person from './components/person'
import PersonForm from './components/personform'
import Filter from './components/filter'
import personService from './services/person'
import Notification from './components/message'
import './index.css'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => { 
        setPersons(initialPersons)
      })
  }, [])

  const change  = (newPerson) => {
    const personToChange = persons.find(person => person.name === newPerson.name)
    const id = personToChange.id
    const changedPerson = {...personToChange, number: newNumber}
    if (window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)){ 
      personService
      .update(id, changedPerson)
      .then(returnedNumber => {
      setPersons(persons.map(person => person.id !== id ? person : returnedNumber))
      setNewName('')
      setNewNumber('')
      })
      .catch(error => {
        setErrorMessage(
          `${newPerson.name} already removed from the server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
      setPersons(persons.filter(person => person.id !== id))

    } else {
      setNewName('')
      setNewNumber('')
      return (console.log('canceled'))
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
  
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const isFound = persons.some(element => {
      if (element.name.toLowerCase() === newName.toLowerCase()) {
        return true;
      }
      return false;
    })

    if (isFound){
        change(newPerson)
      
    } else {
      personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      setErrorMessage(
        `Added ${newPerson.name} to phonebook`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const deletePersonOf = (id) => {
      const person = persons.find(person => person.id === id)

      if (window.confirm(`Do you really want to delete ${person.name}?`)){
        personService
        .deleteOne(id, person)
        .then(setPersons(persons.filter(person => person.id !== id)))
    
      } else {
        return (console.log('canceled'))
      }
      
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
    
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const namesToShow = !setSearchName
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  const handleFilter = (event) => {
      console.log(event.target.value)
      setSearchName(event.target.value)
  }
  return (
    <div>
      <h1>Phonebook</h1>
        <Notification message={errorMessage} />
        <Filter searchName={searchName} handleFilter={handleFilter}/>
      <h2>Add a New</h2>
        <PersonForm addPerson={addPerson} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <div>
        {setSearchName && 
        <ul>
          {namesToShow.map(person => 
          <Person key={person.id} person={person} number={person.number} deletePerson={() => deletePersonOf(person.id)} addPerson={addPerson}/>
          )}
        </ul>
        }
      </div>
    </div>
  )
}

export default App