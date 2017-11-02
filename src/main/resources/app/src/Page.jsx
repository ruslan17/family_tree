import React from 'react';

export default function (Inner) {
    return class Page extends React.Component {
        render() {
                return (
                    <div>
                         <Inner {...this.props}/>
                    </div>
                );
        }
    }
}