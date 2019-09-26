package App.restful.restfulwebservice.todo;





import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersJpaRepository extends JpaRepository<Users,Long>{
	
	Users findByUsernameAndPassword(String username,String password);

}