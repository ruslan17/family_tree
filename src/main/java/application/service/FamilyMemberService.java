package application.service;

import application.model.FamilyMember;

import java.util.List;

/**
 * Сервис
 */
public interface FamilyMemberService {

    List<FamilyMember> findAll();

    FamilyMember findOne(Integer id);

    FamilyMember create(FamilyMember member);

    FamilyMember update(FamilyMember member);

    void delete(Integer id);
}
