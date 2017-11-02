package application.service;

import application.model.FamilyMember;

import java.util.List;

public interface FamilyMemberService {

    List<FamilyMember> findAll();

    FamilyMember create(FamilyMember member);

    FamilyMember update(FamilyMember member);

    void delete(Integer id);
}
