import React from 'react';
import { connect } from 'react-redux'
import Circle from './Circle'

const TerritoryCircle = props => {
    const { x, y, color, placement } = props;
    return <Circle
        x={x}
        y={y}
        color={color}
        count={placement.numTroops}
    />;
}

const mapState = (state, ownProps) => {
    const placement = state.placements[ownProps.territoryId];
    return { placement };
};

export default connect(mapState)(TerritoryCircle);
