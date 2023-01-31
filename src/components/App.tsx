import { useMainListener } from '../hooks/useSocketListener';
import { Header } from './layout/Header/Header';
import { Router } from './layout/Router';
import { ToastContainer } from 'react-toastify';

export const App = () => {
    useMainListener();

    return (
        <div className="app">
            <Header />
            <Router />
            <ToastContainer
                theme={'dark'}
                progressStyle={{background: '#68aec5'}}
                position="top-right"
            />
        </div>
    )
};
