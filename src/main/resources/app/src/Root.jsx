import React from 'react';

const Root = React.createClass({
    childContextTypes: {
        metadata: React.PropTypes.object
    },
    getChildContext() {
        return {metadata: Root.propData};
    },
    render() {
        return (
            this.props.children
        );
    }
});

export default Root;