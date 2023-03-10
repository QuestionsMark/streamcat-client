import { ReactNode } from 'react';
import { usePromises } from '../../contexts/promises.context';

interface Props {
    children: ReactNode;
    className?: string;
    withAside?: boolean;
}

export const ContentWrapper = ({ children, className, withAside }: Props) => {
    const { loading } = usePromises();

    return (
        <div className={`wrapper${loading ? ' blur': ''}${withAside ? ' wrapper--row' : ''}${className ? ' ' + className : ''}`}>
            {children}
        </div>
    );
};