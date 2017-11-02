package application.dao;

import application.model.FamilyMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FamilyMemberDAO extends JpaRepository<FamilyMember, Integer> {



}
