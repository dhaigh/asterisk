import React from 'react';
import { DIE_CHARS } from 'utils/constants';

const Territory = props => {
    const { territory } = props;

    return territory
        ? <div>
            <span className="country" style={{
                backgroundColor: territory.owner.color,
            }}>
                {territory.name} ({territory.armies})
                <div className="dice">
                    {props.dice.map(die => DIE_CHARS[die])}
                </div>
            </span>
        </div>
        : <div>{props.children}</div> || null;
}

export default Territory;
