import React from 'react';
import { darken } from 'polished'

const Item = (props) => {
    return <li>
        <svg width="32" height="32">
            <circle cx="16" cy="16" r="12"
                stroke={darken(0.2, props.color)}
                strokeWidth={1}
                fill={props.color}
            />
        </svg>
        <span>{props.text}</span>
    </li>;
};

export default Item;
