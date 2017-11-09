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
                url: config.get('BASE_URL') + `${this.props.params.id}`,
                type: "PUT",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: this.state.id,
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
                    alert("Wrong input fields");
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
                this.setState({name: member.name});
                this.setState({surname: member.surname});
                this.setState({age: member.age});
                this.setState({
                    mother: {
                        label:   member.mother,
                        value:   member.mother
                    },
                    father: {
                        label:   member.father,
                        value:   member.father
                    },
                    gender: {
                        label:   member.gender,
                        value:   member.gender
                    }

                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    },
    loadAllFromServer: function () {
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

    componentDidMount: function() {
        this.loadFromServer(this.props);
        this.loadAllFromServer();
        this.nameHandler(this.props)
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
    nameHandler: function(event) {
        if (event.target) {
            this.setState({name: event.target.value});
        }
    },
    surnameHandler: function(event) {

        this.setState({surname: event.target.value});
    },
    ageHandler: function(event) {

        this.setState({age: event.target.value});
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
                        <Select
                            name="selected-state"
                            placeholder="Gender"
                            options={selectGender}
                            value={this.state.gender.value}
                            onChange={this.genderHandler}
                        />
                    </td>
                    <td>
                        {self.state.family_map.map(function (m) {
                            if (m.gender === false && m.id != self.state.id && m.age > self.state.age) {
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
                            if (f.gender === true && f.id != self.state.id && f.age > self.state.age) {
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