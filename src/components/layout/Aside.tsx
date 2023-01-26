import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className?: string;
}

export const Aside = ({ children, className }: Props) => {
    return (
        <aside className={`aside${className ? ' ' + className : ''}`}>
            {children}
        </aside>
    );
};