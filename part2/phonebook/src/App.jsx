import { useEffect, useState } from 'react'
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Persons from './components/Persons';
import axios from 'axios';
import phonebookService from './services/phonebook'
import Notifications from './components/Notifications';


function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterInput, setFilterInput] = useState('');
  const[errorMessage,setErrorMessage] = useState(null)

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
      if(window.confirm(`the name ${newName} already exist , replace the old number with new one?`)){
        const newObject = {
        name: newName,
        number: newNumber

      }
        const filteredPerson = persons.find(p => p.name === newName)
        phonebookService.update(filteredPerson.id,newObject).then(data => {
 setPersons(persons => persons.map(p => p.id === filteredPerson.id ? data : p))
        })
        .catch((error) => {
          setErrorMessage(`the person ${newName} does not exist in the server`)
          setPersons(persons.filter(p => p.id !== filteredPerson.id ))
        })
       
        setErrorMessage(`Added ${newNumber} to ${newName}`)
        setTimeout(()=>setErrorMessage(null),2000)
        setNewName('')
        setNewNumber('')
        
      }
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
       setErrorMessage(`Added ${newName}`)
       setTimeout(() =>setErrorMessage(null),2000)

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
      <h1>Phonebook</h1>
      <Notifications message={errorMessage} />
      <Filter filterInput={filterInput} setFilterInput={setFilterInput} />
      <PersonForm addContact={addContact} setNewName={setNewName} newName={newName} setNewNumber={setNewNumber} newNumber={newNumber} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons}  handleDelete={handleDelete}/>
    </>
  )
}

export default App
