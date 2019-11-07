import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { darken } from 'polished'
import Circle from './Circle'
import { selectTerritory, hoverTerritory } from 'actions'
import { getPlacement, getOwnerColor, isActive, isNeighbour } from 'selectors';

class Territory extends PureComponent {
    handleClick = () => {
        this.props.selectTerritory(this.props.territory.id);
    };

    handleMouseOver = () => {
        this.props.hoverTerritory(this.props.territory.id);
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
            {this.props.placement &&
                <Circle
                    x={territory.circle[0]}
                    y={territory.circle[1]}
                    color={this.props.ownerColor}
                    count={this.props.placement.numTroops}
                />
            }
        </g>;
    }
}

export default connect((state, ownProps) => ({
    placement: getPlacement(state, ownProps),
    ownerColor: getOwnerColor(state, ownProps),
    isActive: isActive(state, ownProps),
    isNeighbour: isNeighbour(state, ownProps),
}), { selectTerritory, hoverTerritory })(Territory);
