import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";
import { defaultPlayerState, PlayerAction, playerReducer, PlayerState } from "../reducers/player.reducer";

interface RoomContextValue {
    state: PlayerState;
    dispatch: Dispatch<PlayerAction>;
}

interface Props {
    children: ReactNode;
}

export const RoomContext = createContext<RoomContextValue>(null!);

export const useRoom = () => useContext(RoomContext);

export const RoomProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(playerReducer, defaultPlayerState);
    
    return (
        <RoomContext.Provider value={{ dispatch, state }}>
            {children}
        </RoomContext.Provider>
    );
};