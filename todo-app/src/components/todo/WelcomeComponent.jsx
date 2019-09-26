import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'



class WelcomeComponent extends Component{
    constructor(props){
        super(props)
        this.handleSuccessfulResponse=this.handleSuccessfulResponse.bind(this)
        this.handleError=this.handleError.bind(this)
        this.state={
            welcomeMessage:''
        }
    }
    render(){
        
        return(
            <div>
            <h1>Welcome!</h1>
            <div className="container">
            Welcome {this.props.match.params.name}. You can manage your todos <Link to="/todos">here</Link>.
            </div>
            </div>
            )

        }
        handleSuccessfulResponse(response){
            console.log(response)
            this.setState({welcomeMessage:response.data.message})
        }
        handleError(error){
            console.log(error.response)
            this.setState({welcomeMessage:error.response.data.message})
        }
    }
    export default WelcomeComponent