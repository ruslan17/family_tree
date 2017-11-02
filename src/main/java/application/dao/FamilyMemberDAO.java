package application.dao;

import application.model.FamilyMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "family_member", path = "family_member")
public interface FamilyMemberDAO extends JpaRepository<FamilyMember, Integer> {

}
