import React, { Component, Children, PropTypes } from 'react';

class Toolbar extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        value: this.props.value
    };

    render() {
        return (
            <div className="toolbar">
                {this.renderMarkButton('bold', 'btn fas fa-bold')}
                {this.renderMarkButton('italic', 'btn fas fa-italic')}
            </div>
        )
    }

    renderMarkButton = (type, icon) => {
        const onMouseDown = event => {
            event.preventDefault();
            const {value} = this.state;
            const change = value.change().toggleMark(type);
            this.props.onChange(change);
        };

        return (
            <span className={icon} onMouseDown={onMouseDown}>
            </span>
        )
    }
}

export default Toolbar;