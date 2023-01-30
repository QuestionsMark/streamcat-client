import ReactPlayer from "react-player";

export interface PlayerState {
    player: ReactPlayer | null;
    playing: boolean;
    volume: number;
    muted: boolean;
    duration: number;
    seeking: boolean;
    played: number;
}

export const defaultPlayerState: PlayerState = {
    duration: 0,
    muted: true,
    player: null,
    played: 0,
    playing: false,
    seeking: false,
    volume: 0.1,
};

interface PlayingChange {
    type: 'PLAYING_CHANGE';
    payload: boolean;
}
interface PlayerChange {
    type: 'PLAYER_CHANGE';
    payload: ReactPlayer | null;
}
interface VolumeChange {
    type: 'VOLUME_CHANGE';
    payload: number;
}
interface MutedChange {
    type: 'MUTED_CHANGE';
}
interface DurationChange {
    type: 'DURATION_CHANGE';
    payload: number;
}
interface ProgressMouseDownChange {
    type: 'PROGRESS_MOUSE_DOWN_CHANGE';
}
interface ProgressMouseUpChange {
    type: 'PROGRESS_MOUSE_UP_CHANGE';
}
interface PlayedChange {
    type: 'PLAYED_CHANGE';
    payload: number;
}

export type PlayerAction = PlayingChange | PlayerChange | VolumeChange | MutedChange | DurationChange | ProgressMouseDownChange | ProgressMouseUpChange | PlayedChange;

export const playerReducer = (state: PlayerState, action: PlayerAction): PlayerState => {
    switch (action.type) {
        case 'DURATION_CHANGE': {
            return { ...state, duration: action.payload };
        }

        case 'MUTED_CHANGE': {
            return { ...state, muted: !state.muted };
        }

        case 'PLAYED_CHANGE': {
            return { ...state, played: action.payload };
        }

        case 'PLAYER_CHANGE': {
            return { ...state, player: action.payload };
        }

        case 'PLAYING_CHANGE': {
            return { ...state, playing: action.payload };
        }

        case 'PROGRESS_MOUSE_DOWN_CHANGE': {
            return { ...state, seeking: true };
        }

        case 'PROGRESS_MOUSE_UP_CHANGE': {
            return { ...state, seeking: false };
        }

        case 'VOLUME_CHANGE': {
            return { ...state, volume: action.payload };
        }
    
        default:
            return state;
    }
}