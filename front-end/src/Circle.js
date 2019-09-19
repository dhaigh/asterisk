import React, { PureComponent } from 'react';

class Circle extends PureComponent {
    render() {
        const { x, y, value } = this.props;

        return <g>
            <rect
                x={x}
                y={y}
                fill={this.props.color}
                width={value >= 10 ? 38 : 30}
                height={30}
                rx={15}
                className={value > 0 ? 'visible' : null}
            />
            {value > 0 ?
                <text
                    x={x + 10}
                    y={y + 20}
                >
                    {value}
                </text>
            : null}
        </g>;
    }
}

export default Circle;
