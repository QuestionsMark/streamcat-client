import { HTMLAttributes } from "react";
import { PulseLoader } from "react-spinners";

export const Loading = ({ className, ...rest }: HTMLAttributes<HTMLElement>) => {
    return (
        <div {...rest} className={`loading--mini${className ? ' ' + className : ''}`}>
            <PulseLoader className="loading__spinner" color="#972a22" />
        </div>
    );
};