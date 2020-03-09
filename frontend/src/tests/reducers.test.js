import reducer from 'reducers';
import * as types from 'actions/types';
import * as consts from 'utils/constants';
import {
    init,
    select,
    startGame,
    selectTerritory,
} from 'actions';
import map from 'map.json';

const players = {
    1: {
        id: 1,
        name: "Kurt",
        color: "red",
    },
    2: {
        id: 2,
        name: "Dave",
        color: "black",
    },
    3: {
        id: 3,
        name: "Krist",
        color: "purple",
    },
};

describe('basic setup', () => {
    let state = reducer({}, {});

    test('init', () => {
        state = reducer(state, init({
            map,
            me: players[1],
        }));

        expect(state).toStrictEqual({
            players: {
                myId: 1,

                // no other players have joined yet, thus only id
                // 1 is present
                byId: {
                    1: players[1],
                },
                order: [1],
            },
            neighbours: {
                on: false,
                tid: null,
            },
            game: {
                conflict: {},
                mode: consts.M_PREGAME,
                pickingArmies: false,
                turn: -1,
            },
            map: state.map, // assume map is correct
        });
    });

    // todo: join players

    test('start game', () => {
        state = reducer(state, startGame([1]));
        expect(state.game).toStrictEqual({
            conflict: {},
            mode: consts.M_CLAIMING,
            pickingArmies: false,
            turn: 0,
        });
    });

    test('claiming', () => {
        state = reducer(state, select(1, 1));
        expect(state.game).toStrictEqual({
            conflict: {},
            mode: consts.M_CLAIMING,
            pickingArmies: false,
            turn: 1,
        });
    });

});
