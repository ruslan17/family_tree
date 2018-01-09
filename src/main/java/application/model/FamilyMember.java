package application.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Сущность для члена семьи
 */
@Entity
@Getter
@Setter
public class FamilyMember {

    /**
     * Уникальный идентификатор
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Имя
     */
    private String name;

    /**
     * Фамилия
     */
    private String surname;

    /**
     * Возраст
     */
    private Integer age;

    /**
     * Пол
     * true - мужской, false - женский.
     */
    private boolean gender;

    /**
     * Мать
     */
    private String mother;

    /**
     * Отец
     */

    private String father;

}
