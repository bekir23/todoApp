import React,{Component} from 'react';
import { withRouter } from 'react-router';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

class  HeaderComponent extends Component{
    render(){
        const isUserLoggedIn=AuthenticationService.isUserLoggedIn();
        const getusername=AuthenticationService.getLoggedUserName();
        
        return(
            
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark ">
                <div><span className="navbar-brand text-primary">To-do List App</span></div>
                <ul className="navbar-nav">
                     {isUserLoggedIn && <li><Link className="nav-link" to={`/welcome/${getusername}`} >Home</Link></li>}
                     {isUserLoggedIn && <li ><Link className="nav-link" to="/todos" >Todos</Link></li>}
                </ul>
                <ul className="navbar-nav navbar-collapse justify-content-end">
                   {!isUserLoggedIn && <li ><Link className="nav-link" to="/signup" >Sign Up</Link></li>}
                   {!isUserLoggedIn && <li ><Link className="nav-link" to="/login" >Login</Link></li>}
                   {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout} >Logout</Link></li>}
                </ul>
                </nav>
            </header>
        )

    }
}
export default withRouter(HeaderComponent);