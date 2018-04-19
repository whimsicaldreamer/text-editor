import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import './App.css';

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: '',
                            },
                        ],
                    },
                ],
            },
        ],
    },
});

const buttonActive = [];

function MarkHotKey(options) {
    const {type, key} = options;
    // Return our "plugin" object, containing the `onKeyDown` handler.
    return {
        onKeyDown(event, change) {
            // Check that the key pressed matches our `key` option.
            if (!event.ctrlKey || event.key !== key) return;
            // Prevent the default characters from being inserted.
            event.preventDefault();
            // Toggle button selected style
            toggleButtonState(type);
            // Toggle the mark `type`.
            change.toggleMark(type);
            return true;
        },
    }
}

function toggleButtonState(type) {
    if(buttonActive.includes(type)) {
        const index = buttonActive.indexOf(type);
        buttonActive.splice(index, 1);
    }
    else {
        buttonActive.push(type);
    }
}

// Create an array of plugins.
const plugins = [
    MarkHotKey({ key: 'b', type: 'bold' }),
    MarkHotKey({ key: 'i', type: 'italic' }),
    MarkHotKey({ key: 'u', type: 'underline' }),
    MarkHotKey({ key: '~', type: 'strikethrough' }),
    MarkHotKey({ key: '`', type: 'code' }),
    MarkHotKey({ key: '+', type: 'superscript'}),
    MarkHotKey({ key: '=', type: 'subscript'}),
];

class App extends Component {
    state = {
        value: initialValue,
        buttonsActive: buttonActive
    };

    onChange = ({ value }) => {
        this.setState({ value })
    };

    hasMark = type => {
        const { value } = this.state;
        return value.activeMarks.some(mark => mark.type === type);
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Text formatting using Slate.js</h1>
                </header>
                <div className="toolbar">
                    {this.renderMarkButton('bold', 'btn fas fa-bold')}
                    {this.renderMarkButton('italic', 'btn fas fa-italic')}
                    {this.renderMarkButton('underline', 'btn fas fa-underline')}
                    {this.renderMarkButton('strikethrough', 'btn fas fa-strikethrough')}
                    {this.renderMarkButton('code', 'btn fas fa-code')}
                    {this.renderMarkButton('superscript', 'btn fas fa-superscript')}
                    {this.renderMarkButton('subscript', 'btn fas fa-subscript')}
                </div>
                <div className="notePage">
                    <Editor
                        plugins={plugins}
                        value={this.state.value}
                        onChange={this.onChange}
                        renderMark={this.renderMark}
                        autoFocus
                    />
                </div>
            </div>
        );
    }

    renderMark = props => {
        switch (props.mark.type) {
            case 'bold':
                return <strong>{props.children}</strong>;
            case 'italic':
                return <em>{props.children}</em>;
            case 'underline':
                return <u>{props.children}</u>;
            case 'strikethrough':
                return <del>{props.children}</del>;
            case 'code':
                return <pre><code>{props.children}</code></pre>;
            case 'superscript':
                return <sup>{props.children}</sup>;
            case 'subscript':
                return <sub>{props.children}</sub>;
        }
    };

    renderMarkButton = (type, icon) => {
        const onMouseDown = event => {
            event.preventDefault();
            const {value} = this.state;
            const change = value.change().toggleMark(type);
            // Toggle button selected style
            toggleButtonState(type);
            this.onChange(change);
        };

        const isActive = this.hasMark(type);

        return (
            <span className={icon} onMouseDown={onMouseDown} data-active={isActive? "true" : "false"}>
            </span>
        )
    };
}

export default App;
