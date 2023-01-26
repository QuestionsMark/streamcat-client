import { useMainListener } from '../hooks/useSocketListener';
import { Header } from './layout/Header/Header';
import { Router } from './layout/Router';

export const App = () => {
    useMainListener();

    return (
        <div className="app">
            <Header />
            <Router />
        </div>
    )
};
