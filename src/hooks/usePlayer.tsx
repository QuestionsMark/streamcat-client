import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import { useRoom } from "../contexts/room.context";
import { RoomJoinedPayload, VideoPlayResponsePayload, VideoSeekResponsePayload } from "../types";
import { useCreateListener } from "./useSocketListener";

export const usePlayer = () => {
    const { dispatch, state } = useRoom();
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
        player.seekTo(played - (new Date().getTime() - date) / 1000, 'seconds');
        dispatch({ type: 'PLAYING_CHANGE', payload: true });
    }, [player]);

    useCreateListener('video-pause-response', () => {
        dispatch({ type: 'PLAYING_CHANGE', payload: false });
    });

    useCreateListener('video-seek-response', ({ date, played }: VideoSeekResponsePayload) => {
        if (!player) return;
        player.seekTo(played - (new Date().getTime() - date) / 1000, 'seconds');
        // dispatch({ type: 'PLAYED_CHANGE', payload: played - (new Date().getTime() - date) / 1000 });
    }, [player]);

    useCreateListener('room-joined', ({ username, clients }: RoomJoinedPayload) => {
        console.log(`${username} dołączył do pokoju!`);
        dispatch({ type: 'PLAYING_CHANGE', payload: false });
        dispatch({ type: 'CLIENTS_CHANGE', payload: clients });
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