import { useEffect } from "react";
import { useSocket } from "../contexts/socket.context";

export const useMainListener = () => {
    const { socket } = useSocket();

    useEffect(() => {
        if (!socket) return;
        socket.on('user-connected', message => console.log(message));
        return () => { socket.off('user-connected') };
    }, [socket])

    useEffect(() => {
        if (!socket) return;
        socket.on('user-disconnected', message => console.log(message));
        return () => { socket.off('user-disconnected') };
    }, [socket])
};