import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import SoftBreak from 'slate-soft-break';

import Toolbar from './plugins/toolbar';
import Bold from './plugins/bold';
import Italic from './plugins/italic';
import Underline from './plugins/underline';
import Strikethrough from './plugins/strikethrough';
import Code from './plugins/code';

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

const bold = Bold();
const italic = Italic();
const underline = Underline();
const strikethrough = Strikethrough();
const code = Code();

const plugins = [SoftBreak(), bold, italic, underline, strikethrough, code];


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
                        autoFocus
                        autoCorrect
                    />
                </div>
            </div>
        );
    }
}

export default App;
