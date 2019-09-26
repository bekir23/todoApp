import React,{Component} from 'react';
import AuthenticationService from './AuthenticationService.js'
import TodoDataService from '../../api/todo/TodoDataService.js'
import {Formik,Form,Field,ErrorMessage} from 'formik'


class LoginComponent extends Component{
    constructor(props){
        super(props)

        this.state={
            username:'',
            password:'',
            LoginFailed:false,
        }
        this.onSubmit=this.onSubmit.bind(this)
    }
    onSubmit(values) {
        TodoDataService.login(values.username,values.password).then(
            () =>{ 
                AuthenticationService.registerSuccessfulLogin(values.username)
                this.props.history.push(`/welcome/${values.username}`)
             }
         )
        .catch(()=>
                   this.setState({LoginFailed:true}),
                )
            }
            validate(values){
                let error={}
                if(!values.username){
                    error.username="Enter a Username"
                }
                if(!values.password){
                    error.password="Enter a Password"
                }
                return error;
            }
    render(){
        let username=this.state.username
        let password=this.state.password
        return(
            <Formik
            initialValues={{username,password}}
            onSubmit={this.onSubmit}
            validate={this.validate}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
                    >
            <Form>
            <h1>Login</h1>
            {this.state.LoginFailed && <div className="alert alert-warning">Login Failed</div>}
            <ErrorMessage name="username" component="div" className="alert alert-warning"/>
            <ErrorMessage name="password" component="div" className="alert alert-warning"/>
            <ErrorMessage name="description" component="div" className="alert alert-warning"/>
            <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
            <fieldset className="col-md-4 offset-md-4">
            <label>User Name</label>
            <Field className="form-control " type="text" name="username"/>
            </fieldset>
            <fieldset className="col-md-4 offset-md-4">
            <label>Password</label>
            <Field className="form-control" type="password" name="password"/>
            </fieldset>
            <button className="btn btn-success mt-3" type="submit">Login</button>
        </Form>
         </Formik>
        )
    }
}
export default LoginComponent

