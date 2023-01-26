import { Routes, Route } from 'react-router-dom';
import { GetRoom } from '../views/GetRoom';
import { Home } from '../views/Home';
import { Room } from '../views/Room';

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room" element={<GetRoom />} />
            <Route path="/room/:id" element={<Room />} />
        </Routes>
    );
};