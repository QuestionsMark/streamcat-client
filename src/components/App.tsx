import { useState } from 'react';
import { useMainListener } from '../hooks/useSocketListener';
import './App.scss';

export const App = () => {
    useMainListener();

    return (
        <div className="app">
        
        </div>
    )
};
