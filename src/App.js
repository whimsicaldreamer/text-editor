import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import SoftBreak from 'slate-soft-break';

import Toolbar from './plugins/toolbar';

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

const plugins = [SoftBreak];


class App extends Component {

    // Set the initial value when the app is first constructed.
    state = {
        value: initialValue,
    };

    // On change, update the app's React state with the new editor value.
    onChange = ({ value }) => {
        this.setState({ value });
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Text formatting using Slate.js</h1>
                </header>

                <Toolbar
                    value={this.state.value}
                    onChange={this.onChange}
                />

                <div className="notePage">
                    <Editor
                        plugins={plugins}
                        value={this.state.value}
                        onChange={this.onChange}
                        renderMark={this.renderMark}
                        autoFocus
                        autoCorrect
                    />
                </div>
            </div>
        );
    }

    renderMark = props => {
        const { children, mark } = props;
        switch (mark.type) {
            case 'bold':
                return <strong>{children}</strong>;
            case 'code':
                return <code>{children}</code>;
            case 'italic':
                return <em>{children}</em>;
            case 'underlined':
                return <u>{children}</u>;
        }
    }
}

export default App;
