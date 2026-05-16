import { useEffect, useState } from "react"
import { getWeather } from "../services/countryService"


 
 const Country = ({countryData}) => {

    const[weatherData,setWeatherData] = useState(null)

    useEffect(()=>{
        getWeather(countryData.name.common).then(data => setWeatherData(data))
        
    },[])

    console.log('weather,',weatherData?.weather[0]?.icon)
    
    return(
        <div>
            <h1>{countryData.name.common}</h1>
            <p>capital {countryData.capital}</p>
            <p>area {countryData.area}</p>
            <h1>Languages</h1>
            <ul>
                {Object.values(countryData.languages).map(l => <li key={l}>{l}</li>)}
            </ul>
            <img src={countryData.flags.png}></img>

            <h1>Weather in {countryData.name.common}</h1>
            <p>Temperature {weatherData && weatherData.main.temp} celcius</p>
           {weatherData && <img src = {`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/> }
            <p>Wind {weatherData && weatherData.wind.speed} m/s</p>
            
        </div>
    )
 }

 export default Country