import { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
    end?: boolean;
    indent?: boolean;
}

export const Paragraph = ({ children, className, end, indent = true, ...rest }: Props) => {
    return (
        <p {...rest} className={`paragraph${indent ? ' paragraph--indent' : ''}${end ? ' paragraph--end' : ''}${className ? ' ' + className : ''}`}>
            {children}
        </p>
    );
};