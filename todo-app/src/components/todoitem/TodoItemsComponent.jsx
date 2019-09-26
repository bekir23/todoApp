import React,{Component} from 'react';
import TodoDataService from '../../api/todo/TodoDataService.js'
import TodoItemDataService from '../../api/todo/TodoItemDataService.js'
import AuthenticationService from '../todo/AuthenticationService.js'
import moment from 'moment'
import Mark from './Mark.js'

    class TodoItemsComponent extends Component{
        constructor(props){
            super(props)
            this.state={
                todoid:this.props.match.params.todoid,
                todoitems:[],
                message:'',
            }
            this.deleteTodoItemClicked=this.deleteTodoItemClicked.bind(this)
            this.refreshTodoItems=this.refreshTodoItems.bind(this)
            this.updateTodoItemClicked=this.updateTodoItemClicked.bind(this)
            this.addTodoItemClicked=this.addTodoItemClicked.bind(this)
        }
        componentDidMount(){
            this.refreshTodoItems();
        }
        refreshTodoItems(props){
            let username=AuthenticationService.getLoggedUserName()
            TodoItemDataService.retrieveTodoItems(username,this.state.todoid)
            .then(response=>{
               this.setState({todoitems:response.data})
            })

        }
        deleteTodoItemClicked(id){
            let username=AuthenticationService.getLoggedUserName()
                TodoItemDataService.deleteTodoItem(username,this.state.todoid,id)
                .then(
                    response=>{this.setState({message:`Delete of todoitem successful`});
                    this.refreshTodoItems();
                }
                )
        }
        updateTodoItemClicked(id){
            this.props.history.push(`/todoitems/${this.state.todoid}/${id}`)
        }
        addTodoItemClicked(){
            this.props.history.push(`/todoitems/${this.state.todoid}/-1`)
        }
        toggleComplete(id){
            let username=AuthenticationService.getLoggedUserName()
            TodoItemDataService.toggleComplete(id,this.state.todoid,username);
            this.setState({
                todoitems:this.state.todoitems.map(todoitem=>{
                    if(todoitem.id==id){
                        console.log("dd")
                        return{
                            ...todoitem,
                            done:!todoitem.done
                            
                        }
                    }
                    else{
                        console.log("ee")
                        return todoitem;
                    }
                   
                })
            })
        }
        render(){
            return(
                <div>
                <h1>List TodoItems</h1>
               {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                            <th>Name</th>
                                <th>Description</th>
                                <th>Targetdate</th>
                                <th>Update</th>
                                <th>Delete</th>
                                <th>Is completed ?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todoitems.map(
                                    todo=>
                            <tr key={todo.id}>
                                <td>{todo.name}</td>
                                <td>{todo.description}</td>
                                <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                <td><button className="btn btn-success" onClick={()=>this.updateTodoItemClicked(todo.id)}>Update</button></td>
                                <td><button className="btn btn-warning" onClick={()=>this.deleteTodoItemClicked(todo.id)}>Delete</button></td>
                               
                                <td> <Mark key={todo.id} iscompleted={todo.done} toggleComplete={()=>this.toggleComplete(todo.id)}/></td>
                            </tr>
                                )
                                }
                        </tbody>
                    </table>
                    <div class="row">
                        <button className="btn btn-success" onClick={this.addTodoItemClicked}>Add</button>
                    </div>
                </div>
                </div>
                )
            }
        }
        export default TodoItemsComponent


