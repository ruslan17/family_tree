import React from 'react';

import $ from 'jquery';
import config from 'react-global-configuration';
import {Button, Icon} from 'react-materialize';
import {Link} from 'react-router';

let Application = React.createClass( {
    loadFromServer: function () {
        $.ajax({
            url: config.get('BASE_URL') + `family_member?size=10000`,
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
        this.deleteMember(this.props);
    },
    createMember: function() {
        console.log("save")
    },
    deleteMember: function () {
        $.ajax({
            url: config.get('BASE_URL') + `family_member`,
            type: "DELETE",
            dataType: 'json',
            contentType: 'application/json',
            success: function (member) {
                console.log("delete")
            }.bind(this),
            error: function () {
                console.error("Error");
            }
        });
    },
    render() {
        var self = this;
            return (
                <div>
                    <table id="persons">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Mother</th>
                                <th>Father</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            {self.state.family_member.map(function (person) {
                                return (
                                    <FamilyTree key={person.id}
                                                id={person.id}
                                                name={person.name}
                                                age={person.age}
                                                mother={person.motherId}
                                                father={person.fatherId}
                                                deleteMember={self.deleteMember}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                    <div className="create_button">
                        <Link to={`/create`}>
                            <Button onClick={this.createMember} waves='light' style={{backgroundColor: "green"}}>CREATE<Icon left>input</Icon></Button>
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
                        <td>{props.age}</td>
                        <td>{props.mother}</td>
                        <td>{props.father}</td>
                        <td><Button waves='light' style={{backgroundColor: "blue"}}>EDIT<Icon left>edit</Icon></Button></td>
                        <td><Button waves='light' onClick={props.deleteMember} style={{backgroundColor: "red"}}>DELETE<Icon left>delete</Icon></Button></td>
                    </tr>
    )
}

export default Application;