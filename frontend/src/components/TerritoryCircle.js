import React from 'react';
import { connect } from 'react-redux'
import Circle from './Circle'

const TerritoryCircle = props => {
    const { id, troopCount, ...otherProps } = props;
    return <Circle {...otherProps} count={troopCount} />;
}

const mapState = (state, ownProps) => {
    const { troopCount } = state.territories[ownProps.id];
    return { troopCount };
};

export default connect(mapState)(TerritoryCircle);
