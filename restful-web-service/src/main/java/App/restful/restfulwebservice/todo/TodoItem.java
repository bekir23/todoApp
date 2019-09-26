package App.restful.restfulwebservice.todo;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
@Entity
public class TodoItem {
	
	@Id
	@GeneratedValue
	private Long id;
	private Long todoid;
	private String name;
	private String username;
	private String description;
	private Date targetDate;
	private Date createdDate;
	private boolean isDone;
	
	
protected TodoItem() {
		
	}
		
	public TodoItem(Long id, Long todoid, String name, String username, String description, Date targetDate,
			Date createdDate, boolean isDone) {
		super();
		this.id = id;
		this.todoid = todoid;
		this.name = name;
		this.username = username;
		this.description = description;
		this.targetDate = targetDate;
		this.createdDate = createdDate;
		this.isDone = isDone;
	}
	@Override
	public String toString() {
		return "TodoItem [id=" + id + ", todoid=" + todoid + ", name=" + name + ", username=" + username
				+ ", description=" + description + ", targetDate=" + targetDate + ", createdDate=" + createdDate
				+ ", isDone=" + isDone + "]";
	}
	public Long getId() {
		return id;
	}
	public Long getTodoid() {
		return todoid;
	}
	public String getName() {
		return name;
	}
	public String getUsername() {
		return username;
	}
	public String getDescription() {
		return description;
	}
	public Date getTargetDate() {
		return targetDate;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public boolean isDone() {
		return isDone;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public void setTodoid(Long todoid) {
		this.todoid = todoid;
	}


	public void setName(String name) {
		this.name = name;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public void setTargetDate(Date targetDate) {
		this.targetDate = targetDate;
	}


	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}


	public void setDone(boolean isDone) {
		this.isDone = isDone;
	}


}
