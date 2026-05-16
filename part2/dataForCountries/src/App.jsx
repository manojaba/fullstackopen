import { use, useEffect, useState } from 'react'
import { getAll, getCountry } from './services/countryService'
import Country from './components/Country'



function App() {




  const [filteredNames, setFilteredNames] = useState([])
  const [inputData, setInputData] = useState('')
  const [country, setCountry] = useState(null)

  const searchList = inputData ? filteredNames.filter(n => n.toLowerCase().includes(inputData.toLowerCase())) : []

  useEffect(() => {
    getAll().then(data => {
      const filterData = data.map(d => d.name.common)
      setFilteredNames(filterData)

    })


  }, [])

  useEffect(() => {
    if (searchList.length === 1) {
      getCountry(searchList[0]).then(data => setCountry(data))
      console.log(country, 'country')
    } else {
      setCountry(null)
    }
  }, [inputData])


const handleShow = (name)=> {
  getCountry(name).then(data => setCountry(data))
  
}




  const handleSearch = (e) => {

    setInputData(e.target.value);

  }

  if (!filteredNames) {
    return <>no values yet</>
  }

  return (
    <>
      <form>
        find countries <input value={inputData} onChange={handleSearch} ></input>
      </form>
      {
        searchList.length >= 10
          ? <p>too many matches, specify another filter</p>
          : country
            ? <Country countryData={country}/> 
            : <ul>
              {
                searchList.map(n => <li key={n}>{n} <button onClick={() => handleShow(n)}>show</button></li>)
              }
            </ul>
      }
    </>
  )
}

export default App
