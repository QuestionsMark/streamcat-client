import { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
}

export const Title = ({ children, className, ...rest }: Props) =>
    <h1 {...rest} className={`title${className ? ' ' + className : ''}`}>{children}</h1>;