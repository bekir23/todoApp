import axios from "axios"


class TodoItemDataService{
    retrieveTodoItems(name,id){
        return axios.get(`http://localhost:8080/jpa/users/${name}/todoitems/${id}`);
         //  console.log('executed service')
       }
       retrieveTodoItem(name,todoid,id){
        return axios.get(`http://localhost:8080/jpa/users/${name}/todoitems/${todoid}/${id}`);
         //  console.log('executed service')
       }
       updateTodoItem(name,todoid,id,todoitem){
        return axios.put(`http://localhost:8080/jpa/users/${name}/todoitems/${todoid}/${id}`,todoitem);
      }
      deleteTodoItem(name,todoid,id){
        return axios.delete(`http://localhost:8080/jpa/users/${name}/todoitems/${todoid}/${id}`);
      }
      deleteTodoItems(username,todoid){
        return axios.delete(`http://localhost:8080/jpa/users/${username}/todoitems/${todoid}`);
      }
      createTodoItem(name,todoid,todoitem){
        return axios.post(`http://localhost:8080/jpa/users/${name}/todos/${todoid}`,todoitem);
      }
      toggleComplete(id,todoid,username){
        return axios.put(`http://localhost:8080/jpa/users/${username}/todoitemstoggle/${todoid}/${id}`);
      }


}
export default new TodoItemDataService()


