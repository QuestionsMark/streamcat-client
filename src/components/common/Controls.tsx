import { ChangeEvent, Dispatch, ReactInstance, MouseEvent } from "react";
import { PlayerAction, PlayerState } from "../../reducers/player.reducer";
import { Button } from "./Button";
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import { HiVolumeOff, HiVolumeUp } from 'react-icons/hi';
import { Input } from "../form-elements/Input";
import { getDurationString } from "../../utils/player.helper";
import screenfull from "screenfull";
import { findDOMNode } from "react-dom";
import { MdFullscreen } from "react-icons/md";
import { useSocket } from "../../contexts/socket.context";
import { VideoPlayRequestPayload } from "../../types";

interface Props {
    state: PlayerState;
    dispatch: Dispatch<PlayerAction>;
}

export const Controls = ({ dispatch, state }: Props) => {
    const { duration, muted, played, player, playing, volume } = state;

    const { socket, socketId } = useSocket();

    const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!player) return;
        dispatch({ type: 'PLAYED_CHANGE', payload: duration * Number(e.target.value) });
    }

    const handlePlayingChange = (played: number) => {
        dispatch({ type: 'PLAYING_CHANGE', payload: !playing });
        if (!socket) return;
        socket.emit(playing ? 'video-pause-request' : 'video-play-request', playing ? undefined : { date: new Date().getTime(), played } as VideoPlayRequestPayload);
    };

    const handleProgressMouseDown = () => dispatch({ type: 'PROGRESS_MOUSE_DOWN_CHANGE' });

    const handleProgressMouseUp = (e: MouseEvent<HTMLInputElement>) => {
        if (!player) return;
        player.seekTo(duration * Number(e.currentTarget.value));
        dispatch({ type: 'PROGRESS_MOUSE_UP_CHANGE' })
    };

    const handleFullScreen = () => {
        if (!player) return;
        screenfull.request(findDOMNode(player as ReactInstance) as Element);
    };

    return (
        <div className="player__controls">
            <div className="player__controls-progress">
                <Input type="range" min={0} max={1} step={0.01} value={Number.isFinite(played / duration) ? played / duration : 0} onChange={handleProgressChange} onMouseDown={handleProgressMouseDown} onMouseUp={handleProgressMouseUp} className="form__inp-range player__controls-range" />
            </div>
            <div className="player__controls-playing">
                <Button type="button" onClick={() => handlePlayingChange(played)} className="btn--icon player__controls-btn">
                    {playing ? <BsPauseFill /> : <BsPlayFill />}
                </Button>
            </div>
            <div className="player__controls-volume">
                <Button type="button" onClick={() => dispatch({ type: 'MUTED_CHANGE' })} className="btn--icon player__controls-btn">
                    {muted ? <HiVolumeOff /> : <HiVolumeUp />}
                </Button>
            </div>
            <div className="player__controls-volume-bar">
                <Input type="range" min={0} max={1} step={0.01} value={volume} onChange={e => dispatch({ type: 'VOLUME_CHANGE', payload: Number(e.target.value) })} className="form__inp-range player__controls-range" />
            </div>
            <div className="player__controls-duration">
                {getDurationString(played)} / {getDurationString(duration)}
            </div>
            <div className="player__controls-fullscreen">
                <Button type="button" onClick={handleFullScreen} className="btn--icon player__controls-btn">
                    <MdFullscreen />
                </Button>
            </div>
        </div>
    );
};