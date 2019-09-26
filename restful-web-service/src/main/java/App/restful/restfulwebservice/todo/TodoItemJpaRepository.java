package App.restful.restfulwebservice.todo;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Transactional
@Repository
public interface TodoItemJpaRepository extends JpaRepository<TodoItem,Long>{
	
	
	List<TodoItem> findBytodoid(long todoid);
	

	TodoItem findByIdAndTodoid(long id,long todoid);
	
	Void deleteByIdAndTodoid(long id,long todoid);
	 
	void deleteByTodoid(long todoid);

}