package application.dao;

import application.model.FamilyMember;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * DAO приложения, наследуется от JpaRepository для того чтобы не прописывать методы самим
 */
@RepositoryRestResource(collectionResourceRel = "family_member", path = "family_member")
public interface FamilyMemberDAO extends JpaRepository<FamilyMember, Integer> {


//    @Query("SELECT human.id as id, human.name as name, human.surname as surname, human.age as age, human.sex as sex, parent.name as mother, parent.name as father FROM\n" +
//            "  family_member human\n" +
//            "  JOIN family_member parent ON human.mother = parent.id\n" +
//            "WHERE human.id = :id")
//    FamilyMember findFamilyMemberQById(@Param("id") Integer id);

}
