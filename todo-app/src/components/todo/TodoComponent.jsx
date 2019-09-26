import React,{Component} from 'react'
import moment from 'moment'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import TodoDataService from '../../api/todo/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'
class TodoComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            description:'',

        }
        this.onSubmit=this.onSubmit.bind(this)
        this.validate=this.validate.bind(this)
  

    }
    componentDidMount(){
        let username=AuthenticationService.getLoggedUserName()
        TodoDataService.retrieveTodo(username,this.state.id)
        .then(
           response=>
           this.setState({
           description:response.data.description,
            
       }))
       
    }
    
    onSubmit(values) {
        let username=AuthenticationService.getLoggedUserName()
        let todo={
            id:this.state.id,
            description:values.description,
        }
        if(this.state.id===-1){
            TodoDataService.createTodo(username,todo).then(
               () =>{
                this.props.history.push('/todos')
                }
            )
        }
        else{
        TodoDataService.updateTodo(username,this.state.id,todo).then(
           () =>{
            this.props.history.push('/todos')
            }
        )
        }
    }
    validate(values){
        let error={}
        if(!values.description){
            error.description="Enter a Description"
        }
        else if(values.description.length<5){
            error.description="Enter at least 5 Characters in Description"
        }
        return error;
    }
    render(){
        let description=this.state.description
        return( 
        <div>
                <h1>Todo</h1>
                <div className="container">
                <Formik
                    initialValues={{description}}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize={true}
                    >
                    {
                    (props) => (
                        <Form>
                            <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                            <fieldset className="form-group">
                            <label>Description</label>
                            <Field className="form-control" type="text" name="description"/>
                            </fieldset>
                            <button className="btn btn-success" type="submit">Save</button>
                        </Form>
                    )
                    }
                </Formik>
                </div>
        </div>
        )
    }
}
    export default TodoComponent