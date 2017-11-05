package application.controller;

import application.model.FamilyMember;
import application.service.FamilyMemberService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * Контроллер
 * @RestController используется вместо обычного @Controller, т к тогда @ResponseBody применяется ко всем методам автоматически
 */
@RestController
@RequestMapping("api/family_member")
public class FamilyMemberController {

    private FamilyMemberService service;

    public FamilyMemberController(FamilyMemberService service) {
        this.service = service;
    }

    @RequestMapping(method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public List<FamilyMember> findAll() {
        return service.findAll();
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public FamilyMember find(@PathVariable Integer id) {

        return service.findOne(id);
    }

    @RequestMapping(method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseStatus(HttpStatus.OK)
    FamilyMember create(@RequestBody @Valid FamilyMember member) {
        return service.create(member);
    }

    @RequestMapping(value ="edit", method = RequestMethod.PUT, produces = "application/json;charset=UTF-8")
    FamilyMember update(@RequestBody @Valid FamilyMember member) {
        return service.update(member);
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.DELETE, produces = "application/json;charset=UTF-8")
    @ResponseStatus(value = HttpStatus.OK)
    public void delete(@PathVariable int id) {
        service.delete(id);
    }

    public void setService(FamilyMemberService service) {
        this.service = service;
    }

}
