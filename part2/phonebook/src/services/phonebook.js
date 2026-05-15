import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = (newObject) => {
    return axios.post(baseUrl,newObject).then(response => response.data)
}

const deleteObject = (id) => {
    const url = `${baseUrl}/${id}`
    return axios.delete(url).then(response => response.data)
}

export default {getAll,create,deleteObject}