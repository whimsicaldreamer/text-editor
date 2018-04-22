import React from 'react';

function Italic({key = "i"} = {}) {
    const type = "italic";

    function renderMark(props) {
        const { children, mark } = props;

        if(mark.type !== type) return;
        return <em>{children}</em>;
    }

    function onKeyDown(event, change) {
        // Check that the key pressed matches our `key` option.
        if (!event.ctrlKey || event.key !== key) return;
        // Prevent the default characters from being inserted.
        event.preventDefault();
        // Toggle the mark `type`.
        change.toggleMark(type);
        return true;
    }

    return {
        renderMark,
        onKeyDown
    }
}

export default Italic;