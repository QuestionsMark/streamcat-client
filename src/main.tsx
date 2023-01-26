import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from './components/App';

import { SocketProvider } from './contexts/socket.context';

import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <SocketProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </SocketProvider>
    </React.StrictMode>,
);
