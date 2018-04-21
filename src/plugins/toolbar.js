import React, { Component, Children, PropTypes } from 'react';

class Toolbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
          value: this.props.value
        }
    }
    componentWillReceiveProps(nextProp) {
      if(nextProp.value !== this.props.value) {
        this.setState({value: nextProp.value})
      }
    }

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
