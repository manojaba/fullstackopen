import { useState } from 'react'
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';


function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '9486168028' },
    { name: 'Manoj', number: '9597015689' },
    { name: 'Ajay', number: '244633' },
    {
      name: 'Priya', number: '344233'
    }
  ])



  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('');

  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filterInput.toLowerCase()))


  const addContact = (e) => {
    e.preventDefault()
    const nameExist = persons.some(p => p.name === newName)
    if (nameExist) {
      alert(`the name ${newName}already exists, try another name`)
    } else {
      const newObject = {
        name: newName,
        number: newNumber

      }

      setPersons(persons.concat(newObject))
      setNewName('')
      setNewNumber('')
    }


  }





  return (
    <>
      <h2>Phonebook</h2>
      <Filter filterInput={filterInput} setFilterInput={setFilterInput} />
      <PersonForm addContact={addContact} setNewName={setNewName} newName={newName} setNewNumber={setNewNumber} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </>
  )
}

export default App
