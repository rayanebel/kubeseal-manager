import React from 'react';

const layout = (props) => {
    return (
        <div>
            <p>Toolbar</p>
            {props.children}
        </div>
    );
}

export default layout;