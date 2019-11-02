import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { darken } from 'polished'

import { selectTerritory, hoverTerritory } from 'actions'
import TerritoryCircle from './TerritoryCircle'

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

    handleMouseOut = () => {
        this.props.hoverTerritory(null);
    };

    render() {
        const { id, color, circle, d } = this.props;
        const { isActive, isNeighbour } = this.props;

        return <g
            onClick={this.handleClick}
            onMouseOver={this.handleMouseOver}
            onMouseOut={this.handleMouseOut}
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
            <TerritoryCircle
                x={circle[0]}
                y={circle[1]}
                color={this.props.player.color}
                territoryId={id}
            />
        </g>;
    }
}

const mapToProps = (state, ownProps) => {
    const props = {
        // todo: get "this" player id from somewhere
        player: state.players[1],
        isActive: false,
        isNeighbour: false,
    };

    const { map } = state;

    if (map.viewingBorders) {
        props.isActive = map.hoverTerritory === ownProps.id;
        props.isNeighbour = map.neighbours.indexOf(ownProps.id) >= 0;
    }

    return props;
};

export default connect(
    mapToProps,
    { selectTerritory, hoverTerritory }
)(Territory);
