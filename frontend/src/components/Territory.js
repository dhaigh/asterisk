import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { darken } from 'polished'

import { selectTerritory } from 'actions'
import TerritoryCircle from './TerritoryCircle'

class Territory extends PureComponent {
    onClick = () => {
        if (this.props.player.troopCount === 0) {
            return;
        }

        this.props.selectTerritory(this.props.id);
    };

    render() {
        const { id, color, circle, d } = this.props;
        const { isSelected, isNeighbour } = this.props;

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
                    isSelected ? 'selected' :
                    isNeighbour ? 'neighbour' : null
                }
            />
            <TerritoryCircle
                x={circle[0]}
                y={circle[1]}
                color={this.props.player.color}
                territoryId={id}
            />
        </g>;
    }
}

export default connect((state, ownProps) => ({
    // todo: get "this" player id from somewhere
    player: state.players[1],
    isSelected: state.map.selectedTerritory === ownProps.id,
    isNeighbour: state.map.neighbours.indexOf(ownProps.id) >= 0,
}), { selectTerritory })(Territory);
