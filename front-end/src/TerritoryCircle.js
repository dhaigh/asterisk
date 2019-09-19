import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Circle from './Circle'

class TerritoryCircle extends PureComponent {
    render() {
        const { id, troopCount, ...props } = this.props;
        return <Circle {...props} value={troopCount} />
    }
}

const selectTerritory = (state, props) => state.territories[props.id]
const makeTroopCountSelector = () => {
    return createSelector(selectTerritory, (territory) => {
        return territory.troopCount
    })
}

const makeMapState = () => {
    return (state, ownProps) => {
        const troopCount = makeTroopCountSelector()(state, ownProps);
        return {troopCount};
    };
};

export default connect(makeMapState)(TerritoryCircle);
