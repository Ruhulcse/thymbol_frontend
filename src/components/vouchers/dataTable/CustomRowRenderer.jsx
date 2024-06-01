import React from 'react';

const CustomRowRenderer = (props) => {
    const { row } = props;
    return (
        <div style={{ marginBottom: '10px', display: 'block' }}>
            <div className="react-grid-Row" {...props}>
                {props.children}
            </div>
        </div>
    );
};

export default CustomRowRenderer;
