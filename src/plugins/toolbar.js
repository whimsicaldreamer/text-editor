import React, { Component } from 'react';

class Toolbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
          value: this.props.value
        }
    }
    componentWillReceiveProps(nextProp) {
      if(nextProp.value !== this.props.value) {
        this.setState({value: nextProp.value});
      }
    }

    hasMark = type => {
        const { value } = this.state;
        return value.activeMarks.some(mark => mark.type === type);
    };

    render() {
        return (
            <div className="toolbar">
                {this.renderMarkButton('bold', 'btn fas fa-bold')}
                {this.renderMarkButton('italic', 'btn fas fa-italic')}
                {this.renderMarkButton('underline', 'btn fas fa-underline')}
                {this.renderMarkButton('strikethrough', 'btn fas fa-strikethrough')}
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

        const isActive = this.hasMark(type);

        return (
            <span className={icon} onMouseDown={onMouseDown} data-active={isActive}>
            </span>
        )
    };

}

export default Toolbar;
