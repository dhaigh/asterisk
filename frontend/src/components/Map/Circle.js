import React from 'react';

const Circle = props => {
    const { x, y, count, color } = props;

    return <g>
        <rect
            x={x}
            y={y}
            fill={color}

            // more space for nums with 2 chars
            width={count >= 10 ? 38 : 30}
            height={30}
            rx={15}
        />
        <text x={x + 10} y={y + 20}>{count}</text>
    </g>;
}

export default Circle;
