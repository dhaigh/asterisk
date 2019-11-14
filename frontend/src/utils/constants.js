// num players -> number of reinforcements after claiming
export const STARTING_NUM_ARMIES = {
    2: 40,
    3: 35,
    4: 30,
    5: 25,
    6: 20,
};

export const MIN_ARMIES_PER_TURN = 3;

// for every x territories, you get floor(x / ARMY_DIVISOR) territories.
export const ARMY_DIVISOR = 3;

export const M_PREGAME = 'pregame';
export const M_CLAIMING = 'claiming';
export const M_REINFORCING = 'reinforcing';
export const M_PLACING = 'placing';
export const M_ATTACKING = 'attacking';
