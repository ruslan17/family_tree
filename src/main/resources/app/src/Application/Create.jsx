import React from 'react';

import $ from 'jquery';
import config from 'react-global-configuration';
import {Button, Icon} from 'react-materialize';
import {Link} from 'react-router';
import update from 'react-addons-update';

import Select from 'react-select';

import 'react-select/dist/react-select.css';

// Компонент для создания члена семьи
let Create = React.createClass( {
    loadFromServer: function () {
        $.ajax({
            url: config.get('BASE_URL') + `?size=10000`,
            dataType: 'json',
            success: function(member) {
                this.setState({family_member: member._embedded.family_member});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    },
    send: function() {
        $.ajax({
            url: config.get('BASE_URL'),
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                id: this.state.id,
                name: this.state.name,
                surname: this.state.surname,
                age: this.state.age,
                sex: this.state.sex,
                mother: this.state.mother
            }),
            success: function () {
                const state = update(this.state,
                    {$merge: {
                        name: '',
                        surname: '',
                        age: '',
                        sex: '',
                        mother: ''
                    }}
                );
                this.setState(state);
            }.bind(this),
            error: function () {
                console.error("Error");
            }
        });
    },
    getInitialState: function() {
        return {
            family_member: [],
            name: '',
            surname: '',
            age: '',
            sex: '',
            mother: ''
        };
    },
    componentDidMount: function() {
        this.loadFromServer();
    },
    nameHandler: function(e) {
        const state = update(this.state,
            {$merge: {name: e.target.value}}
        );
        this.setState(state);
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
    sexHandler: function(e) {
        const state = update(this.state,
            {$merge: {sex: e.target.value}}
        );
        this.setState(state);
    },
    motherHandler: function(e) {
        const state = update(this.state,
            {$merge: {mother: e.target.value}}
        );
        this.setState(state);
    },
    updateValue (newValue) {
        this.setState({
            selectValue: newValue,
        });
    },
    render() {
        var options = [];

        var self = this;

        return (
            <div>
                <table id="create">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Age</th>
                            <th>Sex</th>
                            <th>Mother</th>
                            <th>Father</th>
                        </tr>
                        <tr>
                            <td><input type="text"
                                       placeholder="Name"
                                       value={this.state.name}
                                       onChange={this.nameHandler}/></td>
                            <td><input type="text"
                                       placeholder="Surname"
                                       value={this.state.surname}
                                       onChange={this.surnameHandler}/></td>
                            <td><input type="text"
                                       placeholder="Age"
                                       value={this.state.age}
                                       onChange={this.ageHandler}/></td>

                            <td>
                                {self.state.family_member.map(function (content) {
                                    content.label = content.mother;
                                    content.value = content.mother;
                                    options.push(content);
                                })}
                                <Select
                                    name="selected-state"
                                    options={options}
                                    value={this.state.selectValue}
                                    onChange={this.updateValue}
                                    // value={this.state.mother}
                                    // onChange={this.motherHandler}
                                />
                            </td>
                            <td><input type="text" placeholder="Father"/></td>
                        </tr>
                    </tbody>
                </table>
                <div className="create_button">
                        <Button onClick={this.send} waves='light' style={{backgroundColor: "green"}}>CREATE<Icon left>input</Icon></Button>
                </div>
            </div>
        );
    }
});

function logChange(val) {
    console.log('Selected: ', val);
}

export default Create;