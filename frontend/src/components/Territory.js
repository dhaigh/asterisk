import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { darken } from 'polished'

import { place } from 'actions'
import TerritoryCircle from './TerritoryCircle'

class Territory extends PureComponent {
    onClick = () => {
        if (this.props.player.troopCount === 0) {
            return;
        }

        this.props.place(this.props.id);
    };

    render() {
        const { id, color, circle, d } = this.props;
        const [ circleX, circleY ] = circle;

        return <g
            onClick={this.onClick}
            key={id}
        >
            <path
                fill={color}
                color={darken(0.2, color)}
                stroke={darken(0.2, color)}
                d={d}
            />
            <TerritoryCircle
                x={circleX}
                y={circleY}
                color={this.props.player.color}
                territoryId={id}
            />
        </g>;
    }
}

export default connect(state => ({
    player: state.players[1],
}), { place })(Territory);
