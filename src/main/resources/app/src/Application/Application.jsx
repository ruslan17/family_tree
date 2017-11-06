import React from 'react';

import $ from 'jquery';
import config from 'react-global-configuration';
import {Button, Icon} from 'react-materialize';
import {Link} from 'react-router';

// Компонент для отображения всех членов семьи
let Application = React.createClass( {
    loadFromServer: function () {
        $.ajax({
            url: config.get('BASE_URL') + `?size=10000`,
            dataType: 'json',
            success: function(member) {
                this.setState({family_member: member});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    },
    getInitialState: function() {
        return {
            family_member: []
        };
    },
    componentDidMount: function() {
        this.loadFromServer(this.props);
    },
    render() {
        var self = this;
            return (
                <div>
                    <table id="persons">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Mother</th>
                                <th>Father</th>
                                <th>Edit</th>
                            </tr>
                            {self.state.family_member.map(function (person) {
                                return (
                                    <FamilyTree key={person.id}
                                                id={person.id}
                                                name={person.name}
                                                surname={person.surname}
                                                age={person.age}
                                                gender={person.gender === true ? <p>Man</p> : <p>Woman</p>}
                                                mother={person.mother}
                                                father={person.father}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="custom_button">
                        <Link to={`/create`}>
                            <Button waves='light' style={{backgroundColor: "green"}}>CREATE<Icon left>input</Icon></Button>
                        </Link>
                    </div>
                </div>
            );
    }
});

function FamilyTree(props) {
    return (
                    <tr>
                        <td>{props.name}</td>
                        <td>{props.surname}</td>
                        <td>{props.age}</td>
                        <td>{props.gender}</td>
                        <td>{props.mother}</td>
                        <td>{props.father}</td>
                        <td>
                            <Link to={`/edit/${props.id}`}>
                                <Button waves='light' style={{backgroundColor: "blue"}}>EDIT<Icon left>edit</Icon></Button>
                            </Link>
                        </td>
                    </tr>
    )
}

export default Application;