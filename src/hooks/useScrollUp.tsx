import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export const useScrollUp = (condition?: any) => {

    const location = useLocation();
    const html = useRef(document.querySelector('html'));

    const [flag, setFlag] = useState(false);

    const scrollUp = () => setFlag(state => !state);

    useEffect(() => {
        if (!html.current) return;
        html.current.scroll({
            behavior: 'smooth',
            top: 0,
        });
    }, [flag, condition, location]);

    return { scrollUp };
};