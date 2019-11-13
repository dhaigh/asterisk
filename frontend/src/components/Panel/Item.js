import React from 'react';
import { darken } from 'polished'

const Item = (props) => {
    const size = props.small ? 14 : 24;
    const containerSize = size + 4;
    const className = [
        'item',
        props.small ? 'small' : 'regular',
        props.className
    ].join(' ');

    return <li className={className}>
        <svg width={containerSize} height={containerSize}>
            <circle
                cx={containerSize/2}
                cy={containerSize/2}
                r={size/2}
                stroke={darken(0.2, props.color)}
                strokeWidth={1}
                fill={props.color}
            />
        </svg>
        <div className="contents">{props.children}</div>
        <br className="clearboth" />
    </li>;
};

export default Item;
