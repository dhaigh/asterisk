import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { darken } from 'polished'

import { place, toggle } from 'actions'
import TerritoryCircle from './TerritoryCircle'

class Territory extends PureComponent {
    onClick = () => {
        if (!this.props.enabled) {
            return;
        }

        this.props.place(this.props.id);
    };

    render() {
        const { id, color, circle, d } = this.props;
        const [ circleX, circleY ] = circle;
        const isOther = this.props.others.has(id)
        return <g
            onClick={this.onClick}
            key={id}
        >
            <path
                fill={color}
                color={darken(0.2, color)}
                stroke={darken(0.2, color)}
                d={d}
                className={
                    this.props.selected === this.props.id ? 'selected' : 
                     isOther ? 'other' : null
                }
            />
            <TerritoryCircle
                x={circleX}
                y={circleY}
                id={id}
                color={this.props.playerColor}
            />
        </g>;
    }
}

export default connect(state => ({
    playerColor: state.player.color,
    enabled: state.player.troopCount > 0,
    selected: state.selected,
    others: state.others,
}), { place, toggle })(Territory);
