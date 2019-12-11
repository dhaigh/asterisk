// num players -> number of reinforcements after claiming
export const STARTING_NUM_ARMIES = {
    2: 40,
    3: 35,
    4: 30,
    5: 25,
    6: 20,
};

export const MIN_ARMIES_PER_TURN = 3;

// for every x territories, you get floor(x / ARMY_DIVISOR) armies per turn.
export const ARMY_DIVISOR = 3;

// game modes
export const M_PREGAME = 'Pregame';
export const M_CLAIMING = 'Claiming';
export const M_REINFORCING = 'Reinforcing';
export const M_PLACING = 'Placing';
export const M_ATTACKING = 'Attacking';
export const M_FORTIFYING = 'Fortifying';

export const DIE_CHARS = {
    1: '\u2680',
    2: '\u2681',
    3: '\u2682',
    4: '\u2683',
    5: '\u2684',
    6: '\u2685',
};
