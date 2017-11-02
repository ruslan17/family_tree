import React from 'react';

import $ from 'jquery';
import config from 'react-global-configuration';
import {Button, Icon} from 'react-materialize';
import {Link} from 'react-router';

let Create = React.createClass( {
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
    },
    render() {
        var self = this;
        return (
            <div>

            </div>
        );
    }
});

export default Create;