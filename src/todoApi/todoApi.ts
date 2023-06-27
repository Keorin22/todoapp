import axios from "axios";


const todoApi = axios.create({
    baseURL: 'http://192.168.0.42:4444/todo'
})

export default todoApi;