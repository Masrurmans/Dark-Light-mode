import getData from "./dom.js";

const Api = "http://localhost:3000/data"


async function Get(searchWord){
    try {
        const {data} = await axios.get(searchWord ? Api + "?fullname=" + searchWord : Api)
        getData(data)
    } 
    catch (error) {
        console.log(error)
    }
}

async function Post(obj){
    try {
        const {data} = await axios.post(Api, obj)
        Get()
    } catch (error) {
        console.error(error)
    }
}

async function Put(id, obj){
    try {
        const {data} = await axios.put(`${Api}/${id}`, obj)
        Get()
    } catch (error) {
        console.error(error)
    }
}

async function Delete(id){
    try {
        const {data} = await axios.delete(`${Api}/${id}`)
        Get()
    } catch (error) {
        console.error(error)
    }
}

export {Get, Post, Put, Delete}