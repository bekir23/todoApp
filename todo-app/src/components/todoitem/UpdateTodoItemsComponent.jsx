import React,{Component} from 'react'
import moment from 'moment'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import AuthenticationService from '../todo/AuthenticationService.js'
import TodoItemDataService from '../../api/todo/TodoItemDataService.js'
class UpdateTodoItemsComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            id:this.props.match.params.id,
            todoid:this.props.match.params.todoid,
            description:'',
            targetDate: moment(new Date()).format('YYYY-MM-DD')

        }
        this.onSubmit=this.onSubmit.bind(this)
        this.validate=this.validate.bind(this)
    }
    componentDidMount(){
        let username=AuthenticationService.getLoggedUserName()
        TodoItemDataService.retrieveTodoItem(username,this.state.todoid,this.state.id)
     
        .then(
          response=>
          this.setState({
           description:response.data.description,
          targetDate:moment(response.data.targetDate).format('YYYY-MM-DD'),
           name:response.data.name
       }))
    }
    onSubmit(values) {
        let username=AuthenticationService.getLoggedUserName()
        let todoitem={
            id:this.state.id,
            todoid:this.state.todoid,
            description:values.description,
            targetDate:values.targetDate,
            name:values.name,
            createdDate:new Date(),
            username:username
        }
        if(this.state.id===-1){
            TodoItemDataService.createTodoItem(username,this.state.todoid,todoitem).then(
              () =>{
                this.props.history.push(`/todoitems/${this.state.todoid}`)
                }
            )
        }
        else{
        TodoItemDataService.updateTodoItem(username,this.state.todoid,this.state.id,todoitem).then(
           () =>{
            this.props.history.push(`/todoitems/${this.state.todoid}`)
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
        else if(!values.name){
            error.description="Enter a name"
        }
        else if(values.name.length<1){
            error.description="Enter at least 1 Characters in name"
        }
        if(!moment(values.targetDate).isValid()){
            error.targetDate="Enter a valid Target Date"
        }
        return error;
    }
    render(){
        let description=this.state.description
        let targetDate=this.state.targetDate
        let name=this.state.name
        return( 
        <div>
                <h1>Todo Item</h1>
                <div className="container">
                <Formik
                    initialValues={{name,description,targetDate}}
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
                            <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                            <fieldset className="form-group">
                            <label>Name</label>
                            <Field className="form-control" type="text" name="name"/>
                            </fieldset>
                            <fieldset className="form-group">
                            <label>Description</label>
                            <Field className="form-control" type="text" name="description"/>
                            </fieldset>
                            <fieldset className="form-group">
                            <label>Target Date</label>
                            <Field className="form-control" type="text" name="targetDate"/>
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
    export default UpdateTodoItemsComponent