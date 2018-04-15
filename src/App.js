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

function MarkHotKey(options) {
    const {type, key} = options;
    // Return our "plugin" object, containing the `onKeyDown` handler.
    return {
        onKeyDown(event, change) {
            // Check that the key pressed matches our `key` option.
            if (!event.ctrlKey || event.key !== key) return;
            // Prevent the default characters from being inserted.
            event.preventDefault();
            // Toggle the mark `type`.
            change.toggleMark(type);
            return true;
        },
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
    };

    onChange = ({ value }) => {
        this.setState({ value })
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Text formatting using Slate.js</h1>
                </header>
                <div className="toolbar">
                    {this.renderMarkButton('bold', 'fas fa-bold')}
                    {this.renderMarkButton('italic', 'fas fa-italic')}
                    {this.renderMarkButton('underlined', 'fas fa-underline')}
                    {this.renderMarkButton('strikethrough', 'fas fa-strikethrough')}
                    {this.renderMarkButton('code', 'fas fa-code')}
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
        return (
            <span className="btn">
                <i className={icon}></i>
            </span>
        )
    }
}

export default App;
