import { InputHTMLAttributes } from 'react';

export const Input = ({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
    return <input {...rest} className={`form__inp${className ? ' ' + className : ''}`} />
};