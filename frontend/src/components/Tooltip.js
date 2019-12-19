import React, { PureComponent } from 'react';
import Circle from './Map/Circle'
import { connect } from 'react-redux'
import { whoseTurn } from 'selectors';

class Tooltip extends PureComponent {
    render() {
        const { armies, color } = this.props.player;
        if (!armies) {
            return null;
        }

        const [ x, y ] = this.props.mousePos;

        return <svg className="tooltip" style={{
            left: x + 10,
            top: y + 10,
        }}>
            <Circle x={0} y={0} count={armies} color={color} />
        </svg>;
    }
}

export default connect(state => ({
    player: whoseTurn(state),
}))(Tooltip);
