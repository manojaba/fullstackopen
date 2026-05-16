import axios from "axios";
 const apiKey = import.meta.env.VITE_WEATHER_KEY

 

const getAll = () => {
    return axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => response.data)
}

const getCountry = (name) => {
    return axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`).then(response => response.data)
}

const getWeather = (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    return (axios.get(url)
    .then(response => response.data))
}



export   {getAll,getCountry,getWeather}