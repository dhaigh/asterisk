import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { darken } from 'polished'
import Circle from './Circle'

import { selectTerritory, hoverTerritory } from 'actions'

class Territory extends PureComponent {
    handleClick = () => {
        if (this.props.player.troopCount === 0) {
            return;
        }

        this.props.selectTerritory(this.props.id);
    };

    handleMouseOver = () => {
        this.props.hoverTerritory(this.props.id);
    };

    render() {
        const { id, color, circle, d } = this.props;
        const { isActive, isNeighbour } = this.props;

        return <g
            onClick={this.handleClick}
            onMouseOver={this.handleMouseOver}
            key={id}
        >
            <path
                fill={color}
                color={darken(0.2, color)}
                stroke={darken(0.2, color)}
                d={d}
                className={
                    isActive ? 'active' :
                    isNeighbour ? 'neighbour' : null
                }
            />
            <Circle
                x={circle[0]}
                y={circle[1]}
                color={this.props.player.color}
                count={this.props.placement.numTroops}
            />
        </g>;
    }
}

const mapToProps = (state, ownProps) => {
    const props = {
        player: state.players[state.myId],
        isActive: false,
        isNeighbour: false,
        placement: state.placements[ownProps.id],
    };

    const { neighbours } = state;

    if (neighbours.on) {
        props.isActive = ownProps.id === neighbours.tid;

        const territory = state.map.territories[neighbours.tid];
        props.isNeighbour = territory.neighbours.indexOf(ownProps.id) >= 0;
    }

    return props;
};

export default connect(
    mapToProps,
    { selectTerritory, hoverTerritory }
)(Territory);
