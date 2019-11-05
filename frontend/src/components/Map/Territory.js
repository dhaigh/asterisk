import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { darken } from 'polished'
import Circle from './Circle'
import { selectTerritory, hoverTerritory } from 'actions'

class Territory extends PureComponent {
    handleClick = () => {
        this.props.selectTerritory(this.props.id);
    };

    handleMouseOver = () => {
        this.props.hoverTerritory(this.props.id);
    };

    render() {
        // from own props
        const { territory, continentColor } = this.props;

        return <g
            onClick={this.handleClick}
            onMouseOver={this.handleMouseOver}
        >
            <path
                fill={continentColor}
                color={darken(0.2, continentColor)}
                stroke={darken(0.2, continentColor)}
                d={territory.d}
                className={
                    this.props.isActive ? 'active' :
                    this.props.isNeighbour ? 'neighbour' : null
                }
            />

            {/* don't need to render circle if there's no troops */}
            {this.props.placement.numTroops > 0 &&
                <Circle
                    x={territory.circle[0]}
                    y={territory.circle[1]}
                    color={this.props.myColor}
                    count={this.props.placement.numTroops}
                />
            }
        </g>;
    }
}

const mapToProps = (state, ownProps) => {
    const props = {
        myColor: state.players[state.myId].color,
        isActive: false,
        isNeighbour: false,
        placement: state.placements[ownProps.id],
    };

    const { neighbours } = state;

    if (neighbours.on) {
        props.isActive = ownProps.id === neighbours.tid;

        // needs get territory from state (if one has been selected for
        // neighbour viewing--neighbours.tid might be null) and check if this
        // territory is one its neighbours (.indexOf)
        const territory = state.map.territories[neighbours.tid];
        props.isNeighbour = !!territory &&
            territory.neighbours.indexOf(ownProps.id) >= 0;
    }

    return props;
};

export default connect(
    mapToProps,
    { selectTerritory, hoverTerritory }
)(Territory);