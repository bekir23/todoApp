import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import HeaderComponent from './HeaderComponent'
import LoginComponent from './LoginComponent'
import ListTodosComponent from './ListTodosComponent'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import TodoComponent from './TodoComponent.jsx'
import TodoItemsComponent from '../../components/todoitem/TodoItemsComponent.jsx'
import UpdateTodoItemsComponent from '../todoitem/UpdateTodoItemsComponent.jsx'
import SignUpComponent from '../todo/SignUpComponent.jsx'
export default class TodoApp extends Component{
    render(){
        return(
            <div className="TodoApp">
                <Router>
                    <>
                <HeaderComponent/>
                    <Switch>
                    <Route path="/" exact component={LoginComponent}/>
                    <Route path="/login" component={LoginComponent}/>
                    <Route path="/signup" component={SignUpComponent}/>
                    <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                    <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                    <AuthenticatedRoute path="/todos" component={ListTodosComponent}/>
                    <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                    <AuthenticatedRoute path="/todoitems/:todoid/:id" component={UpdateTodoItemsComponent}/>
                    <AuthenticatedRoute path="/todoitems/:todoid" component={TodoItemsComponent}/>
                    
                    <Route  component={ErrorComponent}/>
                    </Switch>
                    <FooterComponent/>
                    </>
                </Router>
            </div>
        )
    }
}






