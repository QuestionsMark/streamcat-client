import { Routes, Route } from 'react-router-dom';
import { RoomProvider } from '../../contexts/room.context';
import { useSocket } from '../../contexts/socket.context';
import { LoadingScreen } from '../popups/LoadingScreen';
import { GetRoom } from '../views/GetRoom';
import { Home } from '../views/Home';
import { Room } from '../views/Room';

export const Router = () => {
    const { socketId } = useSocket();
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room" element={<GetRoom />} />
            <Route path="/room/:id" element={socketId ? <RoomProvider><Room /></RoomProvider> : <LoadingScreen />} />
        </Routes>
    );
};