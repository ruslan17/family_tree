package application.service;

import application.dao.FamilyMemberDAO;
import application.model.FamilyMember;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FamilyMemberServiceImpl implements FamilyMemberService {

    private FamilyMemberDAO familyMemberDAO;

    public FamilyMemberServiceImpl(FamilyMemberDAO familyMemberDAO) {
        this.familyMemberDAO = familyMemberDAO;
    }

    @Override
    public List<FamilyMember> findAll() {
        return familyMemberDAO.findAll();
    }

    @Override
    public FamilyMember create(FamilyMember member) {
        return familyMemberDAO.save(member);
    }

    @Override
    public FamilyMember update(FamilyMember member) {
        return familyMemberDAO.save(member);
    }

    @Override
    public void delete(Integer id) {
        familyMemberDAO.delete(id);
    }
}
