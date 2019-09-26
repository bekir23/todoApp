import React,{Component} from 'react';
import AuthenticationService from './AuthenticationService.js'
import TodoDataService from '../../api/todo/TodoDataService.js'
import {Formik,Form,Field,ErrorMessage} from 'formik'

class SignUpComponent extends Component{
    constructor(props){
        super(props)

        this.state={
            username:'',
            password:'',
            firstname:'',
            lastname:'',
            SignUpFailed:false,
            SignupSuccsess:false,
            timeout: false,
        }
        this.onSubmit=this.onSubmit.bind(this)
        this.validate=this.validate.bind(this)
        this.delaysignup=this.delaysignup.bind(this)
    }
  
    onSubmit(values){
        
        let users={
            firstname:values.firstname,
            lastname:values.lastname,
            email:values.email,
            username:values.username,
            password:values.password
            
        }
        TodoDataService.signup(values.username,users).then(
              () => {
                this.delaysignup();
                this.setState({SignUpSuccsess:true})
                this.setState({SignUpFailed:false})
            },
         )
        .catch(  
                    this.setState({SignUpFailed:true}),
                    this.setState({SignUpSuccsess:false})
                )
            }
            delaysignup(){
                setTimeout(() => {
                  this.props.history.push(`/login`)
                  this.setState({
                    timeout:false,
                  })
                }, 1500)
              }
            
            validate(values){
                let error={}

               if(!values.firstname){
                    error.firstname="Enter a Firstname"
                }
                else if(values.firstname.length<2){
                    error.firstname="Enter at least 2 Characters in Firstname"
                }
                if(!values.lastname){
                    error.lastname="Enter a Lastname"
                }
                else if(values.lastname.length<2){
                    error.lastname="Enter at least 2 Characters in Lastname"
                }
                if(!values.username){
                    error.username="Enter a Username"
                }
                else if(values.username.length<2){
                    error.username="Enter at least 2 Characters in Username"
                }
                if(!values.password){
                    error.password="Enter a Password"
                }
                else if(values.password.length<2){
                    error.password="Enter at least 2 Characters in Password"
                }
                return error;
            }
    render(){
        let firstname=this.state.firstname
        let lastname=this.state.lastname
        let username=this.state.username
        let password=this.state.password
        return(
            <div>
            <h1>Sign Up</h1>
            <div className="container">
            <Formik
            initialValues={{firstname,lastname,username,password}}
            onSubmit={this.onSubmit}
            validate={this.validate}
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            
            >
                {
                    (props) => (
                 
            <Form>
            {this.state.SignUpSuccsess && <div className="alert alert-success">SignUp Succsessful</div>}
            {this.state.SignUpFailed && <div className="alert alert-warning">SignUp Failed, please use another Username</div>}
            
                
                
            <ErrorMessage name="firstname" component="div" className="alert alert-warning"/>
            <ErrorMessage name="lastname" component="div" className="alert alert-warning"/>
            <ErrorMessage name="username" component="div" className="alert alert-warning"/>
            <ErrorMessage name="password" component="div" className="alert alert-warning"/>
            <fieldset className="col-md-4 offset-md-4">
            <label>First Name</label>
            <Field className="form-control " type="text" name="firstname"/>
            </fieldset>
            <fieldset className="col-md-4 offset-md-4">
            <label>Last Name</label>
            <Field className="form-control" type="text" name="lastname"/>
            </fieldset>
            <fieldset className="col-md-4 offset-md-4">
            <label>User Name</label>
            <Field className="form-control" type="text" name="username"/>
            </fieldset>
            <fieldset className="col-md-4 offset-md-4">
            <label>Password</label>
            <Field className="form-control" type="text" name="password"/>
            </fieldset>
            <button className="btn btn-success mt-3" type="submit">Sign Up</button>
        </Form>
                    )}     
         </Formik>
         </div>
         </div>
        )

    }


}
export default SignUpComponent
