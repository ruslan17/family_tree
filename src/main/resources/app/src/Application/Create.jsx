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
                this.setState({family_member: member});
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
                name: this.state.name,
                surname: this.state.surname,
                age: this.state.age,
                sex: this.state.sex,
                mother: this.state.mother.value,
                father: this.state.father
            }),
            success: function () {
                const state = update(this.state,
                    {$merge: {
                        name: '',
                        surname: '',
                        age: '',
                        sex: '',
                        mother: '',
                        father: ''
                    }}
                );
                this.setState(state);
                this.props.history.push('/');
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
            mother: '',
            father: ''
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
    fatherHandler: function(e) {
        const state = update(this.state,
            {$merge: {father: e.target.value}}
        );
        this.setState(state);
    },
    updateValue (newValue) {
        this.setState({
            sex: newValue,
        });
    },
    updateValue1 (newValue) {
        this.setState({
            mother: newValue,
        });
    },
    updateValue2 (newValue) {
        this.setState({
            selectValue2: newValue,
        });
    },
    render() {
        var motherMap = [];
        var fatherMap = [];
        var selectSex = [
            { value: true, label: 'Man' },
            { value: false, label: 'Woman' }
        ];


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
                            {/*<td>*/}
                                {/*<Select*/}
                                    {/*name="selected-state"*/}
                                    {/*options={selectSex}*/}
                                    {/*value={this.state.sex}*/}
                                    {/*onChange={this.updateValue}*/}
                                {/*/>*/}
                            {/*</td>*/}
                            <td>
                                {self.state.family_member.map(function (m) {
                                    motherMap.push({
                                        label: m.mother,
                                        value: m.mother
                                    });
                                })}
                                <Select
                                    name="selected-state"
                                    options={motherMap}
                                    value={this.state.mother}
                                    onChange={this.updateValue1}
                                />
                            </td>
                            <td>
                                {self.state.family_member.map(function (f) {

                                    fatherMap.push({
                                        label: f.father,
                                        value: f.father
                                    });
                                })}
                                <Select
                                    name="selected-state"
                                    options={fatherMap}
                                    value={this.state.selectValue2}
                                    onChange={this.updateValue2}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="create_button">
                        <Button onClick={this.send} waves='light' style={{backgroundColor: "green"}}>CREATE<Icon left>input</Icon></Button>
                </div>
                <div className="button_back">
                    <Link to={`/`}>
                        <Button waves='light' style={{backgroundColor: "green"}}>CREATE<Icon left>input</Icon></Button>
                    </Link>
                </div>
            </div>
        );
    }
});

function logChange(val) {
    console.log('Selected: ', val);
}

export default Create;