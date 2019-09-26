package App.restful.restfulwebservice.todo;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import App.restful.restfulwebservice.todo.Todo;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class TodoJpaResource {
	
	
	@Autowired
	private TodoJpaRepository todoJpaRepository;
	
	@Autowired
	private TodoItemJpaRepository todoItemJpaRepository;
	
	@Autowired
	private UsersJpaRepository usersJpaRepository;
	
	
	@GetMapping("/jpa/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username){	
		return todoJpaRepository.findByUsername(username);
		//return todoService.findAll();
	}
	@DeleteMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username,@PathVariable long id){
		
		todoJpaRepository.deleteById(id);
		
			return ResponseEntity.noContent().build();
		
	}
	@DeleteMapping("/jpa/users/{username}/todoitems/{id}")
	public ResponseEntity<Void> deleteTodoItems(@PathVariable String username,@PathVariable long id){
		

		todoItemJpaRepository.deleteByTodoid(id);
			return ResponseEntity.noContent().build();
		
	}
	
	
	
	
	@GetMapping("/jpa/users/{username}/todos/{id}")
	public Todo getTodo(@PathVariable String username,@PathVariable long id){
		return todoJpaRepository.findById(id).get();
	//	return todoService.findById(id);
	}
	
	
	
	
	@PutMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username,
			@PathVariable long id,@RequestBody Todo todo){
		todo.setUsername(username);
		Todo todoUpdated=todoJpaRepository.save(todo);
		return new ResponseEntity<Todo>(todo,HttpStatus.OK);
	}
	@PostMapping("/jpa/users/{username}/todos")
	public ResponseEntity<Void> createTodo(@PathVariable String username
			,@RequestBody Todo todo){
		
		todo.setUsername(username);
		Todo createdTodo=todoJpaRepository.save(todo);
		
		URI uri=ServletUriComponentsBuilder.fromCurrentRequest()
			.path("/{id}").buildAndExpand(createdTodo.getId()).toUri();
		
				return ResponseEntity.created(uri).build();
	}
	@GetMapping("/jpa/users/{username}/todoitems/{id}")
	public List<TodoItem> getTodoItems(@PathVariable String username,@PathVariable long id){
		return todoItemJpaRepository.findBytodoid(id);
	//	return todoService.findById(id);
	}
	
	@GetMapping("/jpa/users/{username}/todoitems/{todoid}/{id}")
	public TodoItem getTodoItem(@PathVariable String username,@PathVariable long id,@PathVariable long todoid){
		return todoItemJpaRepository.findByIdAndTodoid(id,todoid);
	
	}
	
	@PutMapping("/jpa/users/{username}/todoitems/{todoid}/{id}")
	public ResponseEntity<TodoItem> updateTodoItem(@PathVariable String username,@PathVariable long todoid,
			@PathVariable long id,@RequestBody TodoItem todoitem){
		
		TodoItem todoItemUpdated=todoItemJpaRepository.save(todoitem);
		return new ResponseEntity<TodoItem>(todoitem,HttpStatus.OK);
	}
	@DeleteMapping("/jpa/users/{username}/todoitems/{todoid}/{id}")
	public ResponseEntity<Void> deleteTodoItem(@PathVariable String username,@PathVariable long todoid,@PathVariable long id){
		
		todoItemJpaRepository.deleteById(id);
		
			return ResponseEntity.noContent().build();
		
	}
	@PostMapping("/jpa/users/{username}/todoitems/{todoid}")
	public ResponseEntity<Void> createTodoItem(@PathVariable String username,@PathVariable long todoid
			,@RequestBody TodoItem todoitem){
		

		TodoItem createdTodoItem=todoItemJpaRepository.save(todoitem);
		
		URI uri=ServletUriComponentsBuilder.fromCurrentRequest()
			.path("/{id}").buildAndExpand(createdTodoItem.getId()).toUri();
		
				return ResponseEntity.created(uri).build();
	}

	@GetMapping("/jpa/users/{username}/{password}")
	public Users getUser(@PathVariable String username,@PathVariable String password){
		Users user=usersJpaRepository.findByUsernameAndPassword(username,password);
		if(user==null) {
			throw new RuntimeException("Login Failed");
		}
		return  user;
	
	}
	
	@PostMapping("/jpa/users/{username}/newsignup")
	public ResponseEntity<Void> createUser(@PathVariable String username,@RequestBody Users user){
		
		List<Users> users=usersJpaRepository.findAll();
		
		for(Users ins:users) {
			if(ins.getUsername().equals(username)) {
				throw new RuntimeException("Login Failed");	
			}			
		}
		
		Users createduser=usersJpaRepository.save(user);
		
		URI uri=ServletUriComponentsBuilder.fromCurrentRequest()
			.path("/{id}").buildAndExpand(createduser.getId()).toUri();
		
				return ResponseEntity.created(uri).build();
	}
	
	@PutMapping("/jpa/users/{username}/todoitemstoggle/{todoid}/{id}")
	public ResponseEntity<TodoItem> updateTodoItemIsDone(@PathVariable String username,
			@PathVariable long id,@PathVariable long todoid){
					
		TodoItem todoitem=todoItemJpaRepository.findByIdAndTodoid(id,todoid);
		if(todoitem.isDone()) {
			todoitem.setDone(false);	
			todoItemJpaRepository.save(todoitem);
		}
		else {
			todoitem.setDone(true);
			todoItemJpaRepository.save(todoitem);
		}
				
		return new ResponseEntity<TodoItem>(todoitem,HttpStatus.OK);
	}

	
	
	}