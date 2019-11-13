import React from 'react';
import { darken } from 'polished'

const Item = (props) => {
    const size = props.small ? 14 : 24;
    const containerSize = size + 4;

    return <li className={'item ' + (props.small ? 'small' : 'regular')}>
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
