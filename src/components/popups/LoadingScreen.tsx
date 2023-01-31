import { PulseLoader } from 'react-spinners';

export const LoadingScreen = () => {
    return (
        <div className="loading__layout">
            <PulseLoader className="loading__spinner" color="#972a22" />
        </div>
    );
};