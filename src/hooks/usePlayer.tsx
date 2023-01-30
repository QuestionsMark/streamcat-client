import { useReducer } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import { useSocket } from "../contexts/socket.context";
import { defaultPlayerState, playerReducer } from "../reducers/player.reducer";
import { VideoPlayRequestPayload, VideoPlayResponsePayload } from "../types";
import { useCreateListener } from "./useSocketListener";

export const usePlayer = () => {
    const { socket, socketId } = useSocket();

    const [state, dispatch] = useReducer(playerReducer, defaultPlayerState);
    const { played, player, seeking } = state;

    const onEnded = () => {
        dispatch({ type: 'PLAYING_CHANGE', payload: false });
    };

    const onError = () => {
        console.log('error');
    };

    const onPause = () => {
        console.log('pause');
    };

    const onSeek = () => {
        console.log('seek');
    }

    const onDuration = (duration: number) => {
        console.log('duration');
        dispatch({ type: 'DURATION_CHANGE', payload: duration });
    }

    const onPlay = async () => {
        console.log('play');
        // if (!socket || block) return setBlock(false);
        // if (!player) return;
        
        // const currentTime = player.getCurrentTime();
        // socket.emit('video-play-request', { currentTime, date: new Date() } as VideoPlayRequestPayload);
        // setBlock(false);
    };

    const onProgress = (state: OnProgressProps) => {
        if (!player || seeking) return;
        dispatch({ type: 'PLAYED_CHANGE', payload: state.playedSeconds });
    };

    const onReady = (p: ReactPlayer) => {
        console.log('ready');
        if (player) return;
        
        console.log(p.getInternalPlayer());
        dispatch({ type: 'PLAYER_CHANGE', payload: p });
    };

    const onStart = () => {
        console.log('start');
        if (!player) return;
    };

    useCreateListener('video-play-response', ({ date, played }: VideoPlayResponsePayload) => {
        if (!player) return;
        console.log('Socket');
        const newDate = new Date().getTime();
        const timeDifference = (newDate - date) / 1000;
        console.log(played - timeDifference);
        
        player.seekTo(played - timeDifference, 'seconds');
        dispatch({ type: 'PLAYING_CHANGE', payload: true });
    });

    useCreateListener('video-pause-response', () => {
        dispatch({ type: 'PLAYING_CHANGE', payload: false });
    });

    return {
        dispatch,
        listeners: {
            onDuration,
            onEnded,
            onError,
            onPause,
            onPlay,
            onProgress,
            onReady,
            onSeek,
            onStart,
        },
        state,
    };
};