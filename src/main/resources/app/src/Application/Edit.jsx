import React from 'react';

import $ from 'jquery';
import config from 'react-global-configuration';
import {Button, Icon} from 'react-materialize';
import {Link, replace, browserHistory} from 'react-router';
import update from 'react-addons-update';
import Select from 'react-select';

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
                            age: '',
                            gender: '',
                            mother: '',
                            father: ''
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
    loadAllFromServer: function () {
        $.ajax({
            url: config.get('BASE_URL') + `?size=10000`,
            dataType: 'json',
            success: function(member) {
                this.setState({family_map: member});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
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
                url: config.get('BASE_URL') + `${this.props.params.id}`,
                type: "DELETE",
                success: function () {
                    this.setState({ data: 0 });
                    this.props.history.push('/');
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
        this.loadAllFromServer();
    },
    getInitialState: function() {
        return {
            family_member: [],
            family_map: [],
            name: '',
            surname: '',
            age: '',
            gender: '',
            mother: '',
            father: '',
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
        var self = this;
        var name = self.state.family_member.name;
        var surname = self.state.family_member.surname;
        var age = self.state.family_member.age;
        var gender = self.state.family_member.gender;
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
                    </tbody>
                    <td><input type="text"
                               placeholder="Name"
                               value={name}
                               onChange={this.nameHandler}/></td>
                    <td><input type="text"
                               placeholder="Surname"
                               value={surname}
                               onChange={this.surnameHandler}/></td>
                    <td><input type="text"
                               placeholder="Age"
                               value={age}
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
                        {self.state.family_map.map(function (m) {
                            if (m.gender === false) {
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
                        {self.state.family_map.map(function (f) {
                            if (f.gender === true) {
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

                </table>
                <div className="custom_button">
                    <Button onClick={this.edit} waves='light' style={{backgroundColor: "green"}}>UPDATE<Icon left>input</Icon></Button>
                </div>
                <div className="custom_button">
                    <Button waves='light' onClick={this.deleteMember} style={{backgroundColor: "red"}}>DELETE<Icon left>delete</Icon></Button>
                </div>
            </div>
        );
    }
});

export default Edit;