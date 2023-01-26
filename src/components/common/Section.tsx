import { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
    center?: boolean;
    flex?: boolean;
    noPadding?: boolean;
    title?: string;
    titleClassName?: string;
}

export const Section = ({ children, center, className, flex, noPadding, title, titleClassName, ...rest }: Props) => {
    return (
        <section {...rest} className={`section${title ? ' section--title' : ''}${className ? ' ' + className : ''}`}>
            {title && <h2 className={`section__title${titleClassName ? ' ' + titleClassName : ''}`}>{title}</h2>}
            <div className={`section__content${flex ? ' section__content--flex' : ''}${center ? ' section__content--center' : ''}${noPadding ? ' section__content--no-padding' : ''}`}>
                {children}
            </div>
        </section>
    );
};