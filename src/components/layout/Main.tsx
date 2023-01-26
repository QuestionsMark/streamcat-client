import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className?: string;
}

export const Main = ({ children, className }: Props) => {
    return (
        <main className={`main${className ? ' ' + className : ''}`}>
            {children}
        </main>
    );
};