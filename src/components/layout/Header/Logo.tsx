import { Image } from "../../common/Image";

import logo from '../../../assets/icon.ico';

export const Logo = () => {
    return (
        <div className="logo">
            <Image alt="StreamCat logo icon" src={logo} isStatic className="logo__img" />
            <h2 className="logo__brand-name">Stream<span>Cat</span></h2>
        </div>
    );
};