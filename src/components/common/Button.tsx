import { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    onClick?: () => void;
}

export const Button = ({ className, children, onClick, ...rest }: Props) => {
    const handleClick = (e: MouseEvent) => {
        if (e.currentTarget.getAttribute("type") === "submit") return;
        e.preventDefault();
        if (typeof onClick === "function") {
            onClick();
        }
    };

    return <button {...rest} className={`btn${className ? ' ' + className : ''}`} onClick={handleClick}>{children}</button>;
};