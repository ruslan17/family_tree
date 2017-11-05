import React from 'react';

import $ from 'jquery';
import config from 'react-global-configuration';
import {Button, Icon} from 'react-materialize';
import {Link} from 'react-router';
import update from 'react-addons-update';

// Компонент для редактирования и удаления члена семьи
let Edit = React.createClass( {

    edit: function() {
        if (this.props){
            $.ajax({
                url: config.get('BASE_URL') + `edit`,
                type: "PUT",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: this.state.id,
                    name: this.state.name,
                    surname: this.state.surname,
                    age: this.state.age
                }),
                success: function () {
                    const state = update(this.state,
                        {$merge: {
                            name: '',
                            surname: '',
                            age: ''
                        }}
                    );
                    this.setState(state);
                }.bind(this),
                error: function () {
                    console.error("Error");
                }
            });
        }
    },
    loadFromServer: function (props) {
        $.ajax({
            url: config.get('BASE_URL') + `${props.params.id}`,
            dataType: 'json',
            success: function(member) {
                this.setState({family_member: member});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    },
    deleteMember: function () {
        if (this.props) {
            $.ajax({
                url: config.get('BASE_URL') + `delete/${this.props.params.id}`,
                type: "DELETE",
                success: function (data) {
                    this.setState({ data: 0 });
                }.bind(this),
                error: function () {
                    console.error("Error");
                }
            });
        }
    },
    getInitialState: function() {
        return {
            family_member: []
        };
    },
    componentDidMount: function() {
        this.loadFromServer(this.props);
    },
    getInitialState: function() {
        return {
            family_member: [],
            name: '',
            surname: '',
            age: '',
            id: this.props.params.id
        };
    },
    nameHandler: function(e) {
        // const state = update(this.state,
        //     {$merge: {name: e.target.value}}
        // );
        this.setState({name: e.target.value});
    },
    surnameHandler: function(e) {
        const state = update(this.state,
            {$merge: {surname: e.target.value}}
        );
        this.setState(state);
    },
    ageHandler: function(e) {
        const state = update(this.state,
            {$merge: {age: e.target.value}}
        );
        this.setState(state);
    },
    render() {
        var self = this;
        var name = self.state.family_member.name;
        var age =self.state.family_member.age;
        return (
            <div>
                <table className="create">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Age</th>
                            <th>Sex</th>
                            <th>Mother</th>
                            <th>Father</th>
                        </tr>
                    </tbody>
                            <td><input type="text"
                                       placeholder="Name"
                                       value={name}
                                       onChange={this.nameHandler}/></td>
                            <td><input type="text"
                                       placeholder="Surname"
                                       value={this.state.surname}
                                       onChange={this.surnameHandler}/></td>
                            <td><input type="text"
                                       placeholder="Age"
                                       value={age}
                                       onChange={this.ageHandler}/></td>
                            <td><input type="checkbox"/></td>
                            <td><input type="text" placeholder="Mother"/></td>
                            <td><input type="text" placeholder="Father"/></td>

                </table>
                <div className="create_button">
                        <Button onClick={this.edit} waves='light' style={{backgroundColor: "green"}}>UPDATE<Icon left>input</Icon></Button>
                </div>
                <div>
                    <Button waves='light' onClick={this.deleteMember} style={{backgroundColor: "red"}}>DELETE<Icon left>delete</Icon></Button>
                </div>
            </div>
        );
    }
});

export default Edit;