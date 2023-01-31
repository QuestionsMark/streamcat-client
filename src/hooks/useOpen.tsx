import { useState } from "react";

export interface OpenValue {
    close: () => void;
    isOpen: boolean;
    open: () => void;
}

export const useOpen = (): OpenValue => {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);
    const open = () => setIsOpen(true);

    return { close, isOpen, open };
};