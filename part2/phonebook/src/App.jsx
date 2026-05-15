import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import axios from 'axios';
import phonebookService from './services/phonebook'


function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('');

  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(filterInput.toLowerCase()))

  useEffect(() => {
    console.log('effect')
    phonebookService.getAll()
    .then(data => {
      console.log('promise complete',data)
      setPersons(data)
      console.log('persons',persons)
    })
    
  },[])

  console.log('render',persons.length,'persons')


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

      phonebookService.create(newObject)
      .then(data => {
        console.log('data',data);
        setPersons(persons.concat(data))
       })
      

      setNewName('')
      setNewNumber('')
    }


  }

  const handleDelete = (id) => {
    
   if(window.confirm('do you want to delete',persons.find(p => p.id))){
     phonebookService.deleteObject(id).then(data => {
      console.log('delete data:',data)
      setPersons(persons.filter(p => p.id !== id  ))
    })
   } else {
    console.log('enda ippadi')
   }

  }





  return (
    <>
      <h2>Phonebook</h2>
      <Filter filterInput={filterInput} setFilterInput={setFilterInput} />
      <PersonForm addContact={addContact} setNewName={setNewName} newName={newName} setNewNumber={setNewNumber} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons}  handleDelete={handleDelete}/>
    </>
  )
}

export default App
