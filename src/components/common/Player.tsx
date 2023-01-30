import ReactPlayer from 'react-player';
import { usePlayer } from '../../hooks/usePlayer';
import { Controls } from './Controls';

interface Props {
    src: string;
    className?: string;
}

export const Player = ({ src, className }: Props) => {
    const { dispatch, listeners, state } = usePlayer();
    const { muted, playing, volume } = state;

    return (
        <div className={`player${className ? ' ' + className : ''}`}>
            <ReactPlayer
                url={src}
                height="100%"
                width="100%"
                playing={playing}
                muted={muted}
                volume={volume}
                progressInterval={100}
                // onBuffer={() => console.log('Buffer')}
                // onBufferEnd={() => console.log('BufferEnd')}
                // onClickPreview={() => console.log('ClickPreview')}
                // onDisablePIP={() => console.log('DisablePIP')}
                // onEnablePIP={() => console.log('EnablePIP')}
                // onSeek={() => console.log('Seek')}
                {...listeners}
            />
            <Controls dispatch={dispatch} state={state} />
        </div>
    );
};