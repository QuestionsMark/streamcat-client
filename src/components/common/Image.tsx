import { ImgHTMLAttributes } from "react";
import { HOST_ADDRESS } from "../../../config/config";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
    isStatic?: boolean;
};

export const Image = ({ className, isStatic, src, ...rest }: Props) => {
    return (
        <img
            src={isStatic ? src : `${HOST_ADDRESS}/file/${src}`}
            className={`img${className ? ' ' + className : ''}`}
            crossOrigin="anonymous"
            {...rest}
        />
    )
};