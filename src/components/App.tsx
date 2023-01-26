import { useMainListener } from '../hooks/useSocketListener';
import { Header } from './layout/Header/Header';

export const App = () => {
    useMainListener();

    return (
        <div className="app">
            <Header />
        </div>
    )
};
