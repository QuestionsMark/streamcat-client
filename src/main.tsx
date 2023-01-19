import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { SocketProvider } from './contexts/socket.context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <SocketProvider>
            <App />
        </SocketProvider>
    </React.StrictMode>,
);
