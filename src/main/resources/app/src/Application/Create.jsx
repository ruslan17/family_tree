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
                name: this.state.name,
                surname: this.state.surname,
                age: this.state.age,
                gender: this.state.gender.value,
                mother: this.state.mother.value,
                father: this.state.father.value
            }),
            success: function () {
                const state = update(this.state,
                    {$merge: {
                        name: '',
                        surname: '',
                        age: '',
                        gender: '',
                        mother: '',
                        father: ''
                    }}
                );
                this.setState(state);
                this.props.history.push('/');
            }.bind(this),
            error: function () {
                console.error("Error");
                alert("Wrong arguments");
            }
        });
    },
    getInitialState: function() {
        return {
            family_member: [],
            name: '',
            surname: '',
            age: '',
            gender: '',
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
    genderHandler (newValue) {
        this.setState({
            gender: newValue,
        });
    },
    motherHandler (newValue) {
        this.setState({
            mother: newValue,
        });
    },
    fatherHandler (newValue) {
        this.setState({
            father: newValue,
        });
    },
    render() {
        let self = this;
        let motherMap = [];
        let fatherMap = [];
        let selectGender = [
            { value: true, label: 'Man' },
            { value: false, label: 'Woman' }
        ];

        return (
            <div>
                <table className="create">
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Age</th>
                        <th>Gender</th>
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
                                   placeholder="Age (0 - 150)"
                                   value={this.state.age}
                                   onChange={this.ageHandler}/></td>
                        <td>
                            <Select
                                name="selected-state"
                                placeholder="Gender"
                                options={selectGender}
                                value={this.state.gender}
                                onChange={this.genderHandler}
                            />
                        </td>
                        <td>
                            {self.state.family_member.map(function (m) {
                                if (m.gender === false && m.age > self.state.age) {
                                    motherMap.push({
                                        label: m.name,
                                        value: m.name
                                    });
                                }
                            })}
                            <Select
                                name="selected-state"
                                placeholder="Mother"
                                options={motherMap}
                                value={this.state.mother}
                                onChange={this.motherHandler}
                            />
                        </td>
                        <td>
                            {self.state.family_member.map(function (f) {
                                if (f.gender === true && f.age > self.state.age) {
                                    fatherMap.push({
                                        label: f.name,
                                        value: f.name
                                    });
                                }
                            })}
                            <Select
                                name="selected-state"
                                placeholder="Father"
                                options={fatherMap}
                                value={this.state.father}
                                onChange={this.fatherHandler}
                            />
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className="custom_button">
                    <Button onClick={this.send} waves='light' style={{backgroundColor: "green"}}>CREATE<Icon left>input</Icon></Button>
                </div>
                <div className="custom_button">
                    <Link to={`/`}>
                        <Button waves='light' style={{backgroundColor: "blue"}}>BACK<Icon left>arrow_back</Icon></Button>
                    </Link>
                </div>
            </div>
        );
    }
});

export default Create;