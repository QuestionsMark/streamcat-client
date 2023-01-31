import { forwardRef, OlHTMLAttributes, ReactNode } from 'react';

interface Props extends OlHTMLAttributes<HTMLUListElement> {
    children: ReactNode;
}

export const List = forwardRef<HTMLUListElement, Props>(({ children, className, ...rest }, ref) => {
    return (
        <ul ref={ref} {...rest} className={`list${className ? ' ' + className : ''}`}>
            {children}
        </ul>
    );
});