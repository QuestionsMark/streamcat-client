import { OlHTMLAttributes, ReactNode } from 'react';

interface Props extends OlHTMLAttributes<HTMLUListElement> {
    children: ReactNode;
}

export const List = ({ children, className, ...rest }: Props) => {
    return (
        <ul {...rest} className={`list${className ? ' ' + className : ''}`}>
            {children}
        </ul>
    );
};