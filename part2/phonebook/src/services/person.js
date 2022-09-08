import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const update = (id, newPhone) => {
    const request = axios.put(`${baseUrl}/${id}`, newPhone)
    return request.then(response => response.data)
}

const deleteOne = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(console.log('delete successful'))
}

export default { getAll, create, deleteOne, update }