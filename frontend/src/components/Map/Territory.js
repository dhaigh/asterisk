import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { darken } from 'polished'
import Circle from './Circle'
import { selectTerritory, hoverTerritory } from 'actions'
import { getTerritory } from 'selectors';

class Territory extends PureComponent {
    handleClick = () => {
        this.props.selectTerritory(this.props.territory.id);
    };

    handleMouseOver = () => {
        this.props.hoverTerritory(this.props.territory.id);
    };

    render() {
        // from own props
        const { territory } = this.props;
        const fill = territory.continent.color;

        return <g
            onClick={this.handleClick}
            onMouseOver={this.handleMouseOver}
        >
            <path
                fill={fill}
                color={darken(0.2, fill)}
                stroke={darken(0.2, fill)}
                d={territory.d}
                className={territory.className}
            />

            {/* only render circle if territory is owned (this will only be
                true at the start when all territories are unowned) */}
            {territory.owner &&
                <Circle
                    x={territory.circle[0]}
                    y={territory.circle[1]}
                    color={territory.owner.color}
                    count={territory.armies}
                />
            }
        </g>;
    }
}

export default connect((state, ownProps) => ({
    territory: getTerritory(state, ownProps),
}), { selectTerritory, hoverTerritory })(Territory);
