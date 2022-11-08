import { createContext, Dispatch, useReducer } from 'react';
import Countries from '@/utils/countryData';

export enum GameStatus { RUNNING, WON, LOST, PAUSED }
export enum GameActionType { KEYPRESSED, INITIALISE, GAME_WON, GAME_LOST }
interface GameState {
    countryName: string,
    status: GameStatus,
    wrongInputCount: number,
    keysPressed: string
}
interface GameAction {
    type: GameActionType,
    payload?: any,
}
type GameReducer = (state:GameState, action:GameAction) => GameState;
interface GameContextProviderProps { children: JSX.Element }

const initialGameState:GameState = {
    countryName: '',
    status: GameStatus.PAUSED,
    wrongInputCount: 0,
    keysPressed: ''
};

const gameReducer: GameReducer = (state, action) => {
    switch(action.type) {
        case GameActionType.KEYPRESSED:
            const key = action.payload as string;
            const keysPressed = state.keysPressed.concat(key);
            let wrongInputCount = state.wrongInputCount;
            let status = state.status;

            if (!state.countryName.includes(key)) {
                wrongInputCount++;
            }

            if(wrongInputCount >= 6) {
                console.log('LOST');
                status = GameStatus.LOST;
            } else if(state.countryName.split('').filter(char => !(char === ' ' || keysPressed.includes(char))).length === 0) {
                console.log('WON');
                status = GameStatus.WON;
            }

            return {
                ...state,
                wrongInputCount,
                keysPressed,
                status: status
            };
        case GameActionType.INITIALISE:
            const randomNumber = Math.floor(Math.random() * Countries.length + 1) - 1;
            const newGameState:GameState = {
                countryName: Countries[randomNumber].toLowerCase(),
                status: GameStatus.RUNNING,
                wrongInputCount: 0,
                keysPressed: ''
            };
            return newGameState;
        case GameActionType.GAME_WON:
            return { ...state, status: GameStatus.WON };
        case GameActionType.GAME_LOST:
            return { ...state, status: GameStatus.LOST };
        default: return state;
    }
}

export const GameContext = createContext<{
    state: GameState,
    dispatch: Dispatch<GameAction>
}>({
    state: initialGameState,
    dispatch: () => {}
});

const GameContextProvider = GameContext.Provider;

export default ({ children }: GameContextProviderProps) => {
    const [state, dispatch] = useReducer(gameReducer, initialGameState);

    return (
        <GameContextProvider value={{state, dispatch}}>
            { children }
        </GameContextProvider>
    );
}