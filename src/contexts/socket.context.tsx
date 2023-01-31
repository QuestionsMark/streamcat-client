import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { HOST_ADDRESS } from '../../config/config';

interface SocketContextValue {
    socket: Socket | null;
    socketId: string | null;
}

const SocketContext = createContext<SocketContextValue>(null!);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [socketId, setSocketId] = useState<string | null>(null);
    
    useEffect(() => {
        const newSocket = io(HOST_ADDRESS);
        setSocket(newSocket);
        return () => { newSocket.close() };
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.on('connect', () => {
            setSocketId(socket.id);
        });
        return () => { socket.off('connect') };
    }, [socket])
    
    return (
        <SocketContext.Provider value={{ socket, socketId }}>
            {children}
        </SocketContext.Provider>
    );
}