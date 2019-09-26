import axios from "axios"

class TodoDataService{
    retrieveAllTodos(name){
     return axios.get(`http://localhost:8080/jpa/users/${name}/todos`);
      //  console.log('executed service')
    }
    deleteTodo(name,id){
      return axios.delete(`http://localhost:8080/jpa/users/${name}/todos/${id}`);
    }
    retrieveTodo(name,id){
      return axios.get(`http://localhost:8080/jpa/users/${name}/todos/${id}`);
       //  console.log('executed service')
     }
     updateTodo(name,id,todo){
      return axios.put(`http://localhost:8080/jpa/users/${name}/todos/${id}`,todo);
    }
    createTodo(name,todo){
      return axios.post(`http://localhost:8080/jpa/users/${name}/todos/`,todo);
    }
    login(username,password){
      return axios.get(`http://localhost:8080/jpa/users/${username}/${password}`);
    }
    signup(username,users){
      return axios.post(`http://localhost:8080/jpa/users/${username}/newsignup`,users);
    }
}
export default new TodoDataService()