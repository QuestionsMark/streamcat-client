import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './components/App';
import { PromisesProvider } from './contexts/promises.context';

import { SocketProvider } from './contexts/socket.context';
import { UserProvider } from './contexts/user.context';

import 'react-toastify/dist/ReactToastify.css';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
        <SocketProvider>
            <UserProvider>
                <PromisesProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </PromisesProvider>
            </UserProvider>
        </SocketProvider>
    // </React.StrictMode>,
);
