import React,{Component} from 'react';
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'
import TodoItemDataService from '../../api/todo/TodoItemDataService.js';
    class ListTodosComponent extends Component{
        constructor(props){
            super(props)
            this.state={
                todos:[],
                message:''
            }
            this.deleteTodoClicked=this.deleteTodoClicked.bind(this)
            this.refreshTodos=this.refreshTodos.bind(this)
            this.updateTodoClicked=this.updateTodoClicked.bind(this)
            this.addTodoClicked=this.addTodoClicked.bind(this)
            this.detailTodoClicked=this.detailTodoClicked.bind(this)
        }
        componentDidMount(){
            this.refreshTodos();
        }
        refreshTodos(){
            let username=AuthenticationService.getLoggedUserName()
            TodoDataService.retrieveAllTodos(username)
            .then(response=>{
               this.setState({todos:response.data})
            })

        }
        deleteTodoClicked(id){
            let username=AuthenticationService.getLoggedUserName()
                TodoDataService.deleteTodo(username,id)
                .then(
                    response=>{this.setState({message:`Delete of todo successful`});
                    this.refreshTodos();
                }
                )
                TodoItemDataService.deleteTodoItems(username,id)
                .then(
                    response=>{this.setState({message:`Delete of todo successful`});
                    this.refreshTodos();
                }
                )

        }
        detailTodoClicked(todoid){
            this.props.history.push(`/todoitems/${todoid}`)
        }
        updateTodoClicked(id){
            this.props.history.push(`/todos/${id}`)
        }
        addTodoClicked(){
            this.props.history.push(`/todos/-1`)
        }
        render(){
            return(
                <div>
                <h1>List Todos</h1>
               {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Todo Items</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo=>
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td><button className="btn btn-primary" onClick={()=>this.detailTodoClicked(todo.id)}>Todo Items</button></td>
                                <td><button className="btn btn-success" onClick={()=>this.updateTodoClicked(todo.id)}>Update</button></td>
                                <td><button className="btn btn-warning" onClick={()=>this.deleteTodoClicked(todo.id)}>Delete</button></td>
                            </tr>
                                )
                                }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
                </div>
                )
            }
        }
        export default ListTodosComponent