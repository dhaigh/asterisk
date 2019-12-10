import React from 'react';

const Territory = props => {
    const { territory } = props;

    return territory
        ? <div>
            <span className="country" style={{
                backgroundColor: territory.owner.color,
            }}>
                {territory.name} ({territory.armies})
            </span>
        </div>
        : <div>{props.children}</div> || null;
}

export default Territory;
