import React from 'react';
import { darken } from 'polished'

const PlayerItem = ({ player }) => {
    return <li>
        <svg width="32" height="32">
            <circle cx="16" cy="16" r="12"
                stroke={darken(0.2, player.color)}
                strokeWidth={2}
                fill={player.color}
            />
        </svg>
        <span>{player.name}</span>
    </li>;
};

export default PlayerItem;
