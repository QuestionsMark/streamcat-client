import { ImgHTMLAttributes } from "react";
import { HOST_ADDRESS } from "../../../config/config";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
    isStatic?: boolean;
    isStranger?: boolean;
};

export const Image = ({ className, isStatic, isStranger, src, ...rest }: Props) => {
    return (
        <img
            src={isStranger ? src : isStatic ? src : `${HOST_ADDRESS}/file/${src}`}
            className={`img${className ? ' ' + className : ''}`}
            crossOrigin={!isStranger && !isStatic ? "anonymous" : undefined}
            {...rest}
        />
    )
};